import React, { Component } from 'react';
import Helmet from 'react-helmet';

class InternalServerErrorPage extends Component {
  render() {
    return (
      <div className="internal-server-error">
        <Helmet title="500 | ENotif" />
        <h1>500 - Internal Server Error</h1>
      </div>
    );
  }
}

export default InternalServerErrorPage;
