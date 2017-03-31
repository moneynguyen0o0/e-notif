import React, { Component } from 'react';
import Helmet from 'react-helmet';
import LoginComponent from '../components/Login';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <Helmet title="Login | ENotif" />
        <LoginComponent />
      </div>
    );
  }
}

export default Login;
