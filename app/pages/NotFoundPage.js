import React, { Component } from 'react';
import Helmet from 'react-helmet';

class NotFoundPage extends Component {
  render() {
    return (
      <div className="page-not-found">
        <Helmet title="About | ENotif" />
        <h1>404 - Page Not Found</h1>
      </div>
    );
  }
}

export default NotFoundPage;
