import React, { Component } from 'react';

export default class Spinner extends Component {
  state = {
    ring: false
  }

  _ringBell() {
    this.setState({ ring: !this.state.ring });
  }

  render() {
    const { ring } = this.state;

    return (
      <div className="bell">
        <i className={`fa ${ring ? 'fa-bell' : 'fa-bell-o'}`} onClick={() => this._ringBell()} />
      </div>
    );
  }
}
