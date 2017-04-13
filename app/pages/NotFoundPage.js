import React, { Component } from 'react';
import Helmet from 'react-helmet';

class NotFoundPage extends Component {
  render() {
    return (
      <div className="NotFoundPage">
        <Helmet title="404 | ENotif" />
        <h1>404 - Page Not Found</h1>
      </div>
    );
  }
}

export default NotFoundPage;
