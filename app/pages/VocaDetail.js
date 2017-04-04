import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { findVoca } from '../utils/api';
import Vocabulary from '../components/Vocabulary';

class VocaDetail extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  state = {
    vocabulary: null
  }

  componentDidMount() {
    const {
      params: { id }
    } = this.props;

    findVoca(id).then((vocabulary) => {
      this.setState({ vocabulary });
    });
  }

  render() {
    const { vocabulary } = this.state;

    return (
      <div className="vocabulary">
        {vocabulary && <Helmet title={`${vocabulary.word} | ENotif`} />}
        <Vocabulary data={vocabulary} />
      </div>
    );
  }
}

export default VocaDetail;
