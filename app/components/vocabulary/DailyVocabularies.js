import React, { Component } from 'react';
import { getRandomVocabularies } from '../../utils/api';
import Spinner from '../icons/Spinner';
import Vocabularies from './Vocabularies';

class DailyVocabularies extends Component {
  state = {
    vocabularies: null
  }

  componentDidMount() {
    getRandomVocabularies().then((vocabularies) => {
      this.setState({ vocabularies });
    });
  }

  render() {
    const {
      vocabularies
    } = this.state;

    if (!vocabularies) {
      return <Spinner />;
    }

    return (
      <div className="DailyVocabularies">
        <Vocabularies vocabularies={vocabularies} />
      </div>
    );
  }
}

export default DailyVocabularies;
