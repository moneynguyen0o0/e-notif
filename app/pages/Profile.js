import React, { Component } from 'react';
import Helmet from 'react-helmet';

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <Helmet title="Profile | ENotif" />
        <h3>My profile</h3>
      </div>
    );
  }
}

export default Profile;
