import React, { Component } from 'react';
import Helmet from 'react-helmet';

class AccessDenied extends Component {
  render() {
    return (
      <div className="AccessDeniedPage">
        <Helmet title="Access denied | ENotif" />
        <div className="container">
          <div className="ErrorPage">
            <h1>403 - Access denied</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default AccessDenied;
