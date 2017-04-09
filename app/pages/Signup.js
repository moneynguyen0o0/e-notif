import React, { Component } from 'react';
import Helmet from 'react-helmet';
import SignupComponent from '../components/Signup';

class Signup extends Component {
  render() {
    return (
      <div className="signup">
        <Helmet title="Signup | ENotif" />
        <SignupComponent />
      </div>
    );
  }
}

export default Signup;
