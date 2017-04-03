import React, { Component } from 'react';
import { notify, close as closeNotification } from '../utils/notify';

export default class Spinner extends Component {
  state = {
    ring: true
  }

  componentDidMount() {
    if (this.state.ring) {
      this._startNotificationInterval();
    }
  }

  componentWillUnmount() {
    this._clearNotificationInterval();
  }

  _ringBell() {
    const { ring } = this.state;

    if (!ring) {
      this._startNotificationInterval();
    } else {
      this._clearNotificationInterval();
    }

    this.setState({ ring: !ring });
  }

  _startNotificationInterval() {
    this.notificationInterval = setInterval(() => this._notifyVoca(), 3000);
  }

  _clearNotificationInterval() {
    clearInterval(this.notificationInterval);

    const notificationVoca = this.notificationVoca;

    if (notificationVoca) {
      closeNotification(notificationVoca);
    }
  }

  _notifyVoca() {
    this.notificationVoca = notify('Hey', {
      body: 'How are you?'
    }, {
      onclick: () => {
        console.log('Clicked');
      }
    });
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
