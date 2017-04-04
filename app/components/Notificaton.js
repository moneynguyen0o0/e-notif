import React, { Component } from 'react';
import { notify, close as closeNotification } from '../utils/notify';
import { searchVocas } from '../utils/api';

export default class Notificaton extends Component {
  state = {
    ring: true,
    vocabularies: [],
    vocabularyIndex: 0,
  }

  componentDidMount() {
    const start = 0; // TODO: local storage (start, notify)

    searchVocas({ start }).then((vocabularies) => {
      this.setState({ vocabularies });
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
    const { vocabularies, vocabularyIndex } = this.state;

    if (vocabularies.length) {
      const vocabulary = vocabularies[vocabularyIndex];

      const {
        id,
        word,
        definitions
      } = vocabulary;

      this.notificationVoca = notify(word, {
        icon: '/favicon.ico',
        body: definitions.toString()
      }, {
        onclick: () => {
          window.open(`${location.protocol}//${location.host}/vocabularies/${id}`, '_blank');
        }
      });

      // Not need to rerender
      this.state.vocabularyIndex = vocabularyIndex === vocabularies.length - 1 ? 0 : vocabularyIndex + 1;
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
