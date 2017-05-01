import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="Footer-icons">
          <a><i className="fa fa-facebook" /></a>
          <a><i className="fa fa-twitter" /></a>
          <a><i className="fa fa-linkedin" /></a>
          <a><i className="fa fa-google-plus" /></a>
          <a><i className="fa fa-instagram" /></a>
        </div>
        <div className="Footer-name">Copyright (c) 2016 | All Rights Reserved</div>
      </div>
    );
  }
}

export default Footer;
