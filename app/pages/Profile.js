import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Profile from '../components/user/Profile';
import ChangePassword from '../components/user/ChangePassword';

class ProfilePage extends Component {
  render() {
    return (
      <div className="ProfilePage">
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
