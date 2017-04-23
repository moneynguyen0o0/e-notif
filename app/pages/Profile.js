import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ChangePassword from '../components/ChangePassword';

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <Helmet title="Profile | ENotif" />
        <div className="container">
          <ChangePassword />
        </div>
      </div>
    );
  }
}

export default Profile;
