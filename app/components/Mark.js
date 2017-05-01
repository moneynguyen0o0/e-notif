import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { markVocabulary } from '../utils/api';

class Mark extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object,
    marked: PropTypes.bool
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    marked: this.props.marked || false,
    isWaiting: true
  }

  _mark() {
    const { id: _id, user: { authenticated } } = this.props;
    const { router } = this.context;

    if (!authenticated) {
      router.push('/login');
    } else {
      markVocabulary(_id)
      .then(() => this.setState({ marked: !this.state.marked, isWaiting: true }))
      .catch(() => {
        router.push('/internal-server-error');
      });
      this.setState({ isWaiting: false });
    }
  }

  render() {
    const { marked, isWaiting } = this.state;

    const props = {
      onClick: isWaiting ? () => this._mark() : null
    };

    return (
      <a {...props}>
        <i className={`fa ${marked ? 'fa-bookmark' : 'fa-bookmark-o'}`} />
      </a>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Mark);
