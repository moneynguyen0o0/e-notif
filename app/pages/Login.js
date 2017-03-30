import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Login as LoginComponet } from '../components/Login';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <Helmet title="Login | ENotif" />
        <LoginComponet />
      </div>
    );
  }
}

export default Login;
