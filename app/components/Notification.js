import React, { Component, PropTypes } from 'react';
import store from 'store';
import { connect } from 'react-redux';
import { notify, close as closeNotification } from '../utils/notify';
import { getMarkedVocabularies, searchVocabularies } from '../utils/api';

const notifyKey = '_nofify';

const TIMEOUT = 5000;

class Notificaton extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  state = {
    vocabularies: []
  }

  componentWillMount() {
    const notification = this._getNotificationFromStore();
    const { notified, index = 0 } = notification;

    this.setState({
      ring: notified !== undefined ? notified : true,
      vocabularyIndex: index
    });
  }

  componentDidMount() {
    const { user: { authenticated } } = this.props;

    if (authenticated) {
      getMarkedVocabularies().then((vocabularies) => {
        this.setState({ vocabularies });
      });
    } else {
      searchVocabularies().then((vocabularies) => {
        this.setState({ vocabularies });
      });
    }

    if (this.state.ring) {
      this._startNotificationInterval();

      // Store to local
      const notification = this._getNotificationFromStore();
      notification.notified = true;
      this._setNotificationToStore(notification);
    }
  }

  componentWillUnmount() {
    this._clearNotificationInterval();
  }

  _getNotificationFromStore() {
    return store.get(notifyKey) || {};
  }

  _setNotificationToStore(notification) {
    store.set(notifyKey, notification);
  }

  _ringBell() {
    const { ring } = this.state;
    const notified = !ring;

    if (notified) {
      this._startNotificationInterval();
    } else {
      this._clearNotificationInterval();
    }

    // Store to local
    const notification = this._getNotificationFromStore();
    notification.notified = notified;
    this._setNotificationToStore(notification);

    this.setState({ ring: notified });
  }

  _startNotificationInterval() {
    this.notificationInterval = setInterval(() => this._notifyVocabulary(), TIMEOUT);
  }

  _clearNotificationInterval() {
    clearInterval(this.notificationInterval);

    const notificationVoca = this.notificationVoca;

    if (notificationVoca) {
      closeNotification(notificationVoca);
    }
  }

  _notifyVocabulary() {
    const { vocabularies, vocabularyIndex: currentIndex } = this.state;

    if (vocabularies.length) {
      const vocabularyIndex = currentIndex >= vocabularies.length ? 0 : currentIndex;
      const vocabulary = vocabularies[vocabularyIndex];

      const {
        _id,
        word,
        definitions
      } = vocabulary;

      this.notificationVoca = notify(word, {
        icon: '/favicon.ico',
        body: definitions.toString()
      }, {
        onclick: () => {
          window.open(`${location.protocol}//${location.host}/vocabularies/${_id}`, '_blank');
        }
      });

      const index = vocabularyIndex === vocabularies.length - 1 ? 0 : vocabularyIndex + 1;

      // Store to local
      const notification = this._getNotificationFromStore();
      notification.index = index;
      this._setNotificationToStore(notification);

      // Not need to rerender
      this.state.vocabularyIndex = index;
    }
  }

  render() {
    const { ring } = this.state;

    return (
      <a className="Notification">
        <i className={`fa ${ring ? 'fa-bell' : 'fa-bell-o'}`} onClick={() => this._ringBell()} />
      </a>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Notificaton);
