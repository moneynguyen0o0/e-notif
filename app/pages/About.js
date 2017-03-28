import React, { Component } from 'react';
import Helmet from 'react-helmet';

class About extends Component {
  render() {
    return (
      <div className="about">
        <Helmet title="About | ENotif"/>
        <h3>About</h3>
      </div>
    );
  }
}

export default About;
