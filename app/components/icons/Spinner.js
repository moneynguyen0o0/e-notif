import React, { Component, PropTypes } from 'react';

export default class Spinner extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['spin', 'bars'])
  }

  static defaultProps = {
    type: 'spin'
  }

  render() {
    const { type } = this.props;
    
    return (
      <div className="Spinner">
        <div className={`Spinner-icon Spinner-${type}`} />
      </div>
    );
  }
}
