import React, { Component } from 'react';
import Helmet from 'react-helmet';
import SignupComponent from '../components/user/Signup';

class Signup extends Component {
  render() {
    return (
      <div className="SignupPage">
        <Helmet title="Signup | ENotif" />
        <div className="container">
          <SignupComponent />
        </div>
      </div>
    );
  }
}

export default Signup;
