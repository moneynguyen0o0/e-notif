import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Profile from '../components/Profile';
import ChangePassword from '../components/ChangePassword';

class ProfilePage extends Component {
  render() {
    return (
      <div className="profile">
        <Helmet title="Profile | ENotif" />
        <div className="container">
          <Profile />
          <ChangePassword />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
