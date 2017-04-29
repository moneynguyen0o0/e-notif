import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ResetPasswordComponent from '../components/user/ResetPassword';

class ResetPassword extends Component {
  render() {
    return (
      <div className="ResetPasswordPage">
        <Helmet title="Rest password | ENotif" />
        <div className="container">
          <ResetPasswordComponent />
        </div>
      </div>
    );
  }
}

export default ResetPassword;
