const express = require('express');
const passport = require('passport');

const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcryptSalt = 10;


// Custom Callback de passport
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: 'Error authenticating user',
      });
    }
    if (!user) {
      return res.status(500).json({
        message: 'No user in database',
      });
    }
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});


router.post('/signup', (req, res, next) => {
  const {
    username, password, campus, course,
  }  = req.body;

  if (username === '' || password === '' || campus === '' || course === '') {
    res.status(500).json({
      message: 'Provide username and password',
    });
    return;
  }

  User.findOne({
    username,
  }, 'username', (err, user) => {
    if (user !== null) {
      res.status(500).json({
        message: 'The username already exists. Choose another one.',
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      campus,
      course,
    });

    newUser.save()
      .then(() => {
        res.status(200).json(newUser);
      })
      .catch(() => {
        res.status(500).json({
          message: 'Saving user to database went wrong.',
        });
      });
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({
    message: 'Log out success!',
  });
});

router.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({
    message: 'Unauthorized',
  });
});


router.post('/edit', (req, res, next) => {
  const { username, campus, course } = req.body;
  User.findByIdAndUpdate(req.user._id, { username, campus, course }, { new:true })
    .then((userUpdated) => {
      res.status(200).json({ userUpdated });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

module.exports = router;
