import React, { Component } from 'react';
import Helmet from 'react-helmet';

class Home extends Component {
  render() {
    return (
      <div className="HomePage">
        <Helmet title="Home | ENotif" />
        <div className="container">
          <h1>Please complete it soon!!!</h1>
        </div>
      </div>
    );
  }
}

export default Home;
