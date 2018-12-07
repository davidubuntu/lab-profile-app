import React, { Component } from 'react'
import Link from 'react-router-dom/Link';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Login React App</h1>
        <Link to={"/signup"}><button>Sign Up</button></Link>
        <Link to={"/login"}><button>Login</button></Link>
      </div>
    )
  }
}
