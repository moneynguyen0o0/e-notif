import React, { Component } from 'react';
import Helmet from 'react-helmet';
import VerifyMailComponent from '../components/user/VerifyMail';

class VerifyMail extends Component {
  render() {
    return (
      <div className="VerifyMailPage">
        <Helmet title="Verify mail | ENotif" />
        <div className="container">
          <VerifyMailComponent />
        </div>
      </div>
    );
  }
}

export default VerifyMail;
