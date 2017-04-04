import React, { Component } from 'react';
import Helmet from 'react-helmet';

class VocaDetail extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="vocabulary">
        <Helmet title=" | ENotif" />
        <h3>OK</h3>
      </div>
    );
  }
}

export default VocaDetail;
