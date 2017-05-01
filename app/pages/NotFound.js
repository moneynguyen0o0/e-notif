import React, { Component } from 'react';
import Helmet from 'react-helmet';

class NotFound extends Component {
  render() {
    return (
      <div className="NotFoundPage">
        <Helmet title="Page not found | ENotif" />
        <div className="container">
          <div className="ErrorPage">
            <h1>404 - Page Not Found</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
