import React, { Component } from 'react';
import Helmet from 'react-helmet';
import LoginComponent from '../components/user/Login';

class Login extends Component {
  render() {
    return (
      <div className="LoginPage">
        <Helmet title="Login | ENotif" />
        <div className="container">
          <LoginComponent />
        </div>
      </div>
    );
  }
}

export default Login;
