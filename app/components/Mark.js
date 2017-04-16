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
    marked: this.props.marked || false
  }

  _mark() {
    const { id: _id, user: { authenticated } } = this.props;
    const { router } = this.context;

    if (!authenticated) {
      router.push('/login');
    }

    markVocabulary(_id)
    .then(() => this.setState({ marked: !this.state.marked }))
    .catch((error) => {
      const { response } = error;

      if (response) {
        if (response.status === 401) {
          router.push('/login');
        } else {
          router.push('/500');
        }
      } else {
        router.push('/500');
      }
    });
  }

  render() {
    const { marked } = this.state;

    return (
      <a onClick={() => this._mark()}>
        <i className={`fa ${marked ? 'fa-bookmark' : 'fa-bookmark-o'}`} />
      </a>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Mark);
