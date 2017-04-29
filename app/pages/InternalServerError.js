import React, { Component } from 'react';
import Helmet from 'react-helmet';

class InternalServerError extends Component {
  render() {
    return (
      <div className="InternalServerErrorPage">
        <Helmet title="Internal server error | ENotif" />
        <h1>500 - Internal Server Error</h1>
      </div>
    );
  }
}

export default InternalServerError;
