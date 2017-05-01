import React, { Component, PropTypes } from 'react';

class Message extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['error', 'success', 'info']),
    text: PropTypes.string,
    close: PropTypes.func
  }

  static defaultProps = {
    type: 'success'
  }

  render() {
    const { type, text, close } = this.props;

    return (
      <div className={`Message Message-${type}`}>
        <div className="Message-text">{text}</div>
        {close && <div className="Message-icon" onClick={() => close()}><i className="fa fa-times" /></div>}
      </div>
    );
  }
}

export default Message;
