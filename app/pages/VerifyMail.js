import React, { Component } from 'react';
import Helmet from 'react-helmet';
import VerifyMailComponent from '../components/user/VerifyMail';

class VerifyMail extends Component {
  render() {
    return (
      <div className="VerifyMailPage">
        <Helmet title="Verify mail | ENotif" />
        <VerifyMailComponent />
      </div>
    );
  }
}

export default VerifyMail;
