import React, { Component } from 'react';
import Helmet from 'react-helmet';

class AccessDenied extends Component {
  render() {
    return (
      <div className="AccessDeniedPage">
        <Helmet title="Access denied | ENotif" />
        <h1>403 - Access denied</h1>
      </div>
    );
  }
}

export default AccessDenied;
