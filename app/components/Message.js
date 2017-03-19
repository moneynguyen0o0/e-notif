import React, { Component } from 'react';

require('styles/app.css');

class Message extends Component {
  render() {

    return (
      <div className="Message">
        <h1 className="Message-text">OK! Cool!</h1>
      </div>
    );
  }
}

export default Message;
