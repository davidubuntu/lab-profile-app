import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import { Route, Switch} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
    );
  }
}

export default App;
