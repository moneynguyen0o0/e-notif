import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ResetPassword from '../components/ResetPassword';

class ResetPasswordPage extends Component {
  render() {
    return (
      <div className="ResetPasswordPage">
        <Helmet title="Rest password | ENotif" />
        <div className="container">
          <ResetPassword />
        </div>
      </div>
    );
  }
}

export default ResetPasswordPage;
