import React, { Component } from 'react';
import Helmet from 'react-helmet';
import VerifyMail from '../components/social/VerifyMail';

class VerifyMailPage extends Component {
  render() {
    return (
      <div className="VerifyMailPage">
        <Helmet title="Verify mail | ENotif" />
        <VerifyMail />
      </div>
    );
  }
}

export default VerifyMailPage;
