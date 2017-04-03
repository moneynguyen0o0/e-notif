import React, { Component } from 'react';
import { notify, close as closeNotification } from '../utils/notify';
import { searchVocas } from '../utils/api';

export default class Notificaton extends Component {
  state = {
    ring: true,
    vocas: [],
    vocaIndex: 0,
  }

  componentDidMount() {
    const start = 0; // TODO: local storage

    searchVocas({ start }).then((vocas) => {
      this.setState({ vocas });
    });

    this._startNotificationInterval();
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
    const { vocas, vocaIndex } = this.state;

    if (vocas.length) {
      const voca = vocas[vocaIndex];

      const {
        word,
        definitions
      } = voca;

      this.notificationVoca = notify(word, {
        icon: '/favicon.ico',
        body: definitions.toString()
      }, {
        onclick: () => {
          console.log('Clicked');
        }
      });

      // Not need to rerender
      this.state.vocaIndex = vocaIndex === vocas.length - 1 ? 0 : vocaIndex + 1;
    }
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
