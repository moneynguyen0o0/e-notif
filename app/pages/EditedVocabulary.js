import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { findVocabulary } from '../utils/api';
import VocabularyForm from '../components/VocabularyForm';

class EditedVocabulary extends Component {
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

    findVocabulary(id).then((vocabulary) => {
      this.setState({ vocabulary });
    });
  }

  render() {
    const { vocabulary } = this.state;

    return (
      <div className="new-vocabulary">
        <Helmet title="Edit vocabulary | ENotif" />
        {vocabulary && <VocabularyForm data={vocabulary} />}
      </div>
    );
  }
}

export default EditedVocabulary;
