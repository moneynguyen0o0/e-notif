import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ForgotPasswordComponent from '../components/user/ForgotPassword';

class ForgotPassword extends Component {
  render() {
    return (
      <div className="ForgotPasswordPage">
        <Helmet title="Forgot password | ENotif" />
        <div className="container">
          <ForgotPasswordComponent />
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
