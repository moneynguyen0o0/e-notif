import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ForgotPassword from '../components/ForgotPassword';

class ForgotPasswordPage extends Component {
  render() {
    return (
      <div className="ForgotPasswordPage">
        <Helmet title="Forgot password | ENotif" />
        <div className="container">
          <ForgotPassword />
        </div>
      </div>
    );
  }
}

export default ForgotPasswordPage;
