import React, { Component } from 'react';
import Helmet from 'react-helmet';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <Helmet title="Login | ENotif" />
        <h3>Login</h3>
      </div>
    );
  }
}

export default Login;
