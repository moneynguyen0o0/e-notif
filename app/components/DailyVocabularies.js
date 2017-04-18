import React, { Component } from 'react';
import { getDailyVocabularies } from '../utils/api';
import Vocabularies from './Vocabularies';

class DailyVocabularies extends Component {
  state = {
    vocabularies: []
  }

  componentDidMount() {
    getDailyVocabularies().then((vocabularies) => {
      this.setState({ vocabularies });
    });
  }

  render() {
    const {
      vocabularies
    } = this.state;

    return (
      <div className="DailyVocabularies">
        <Vocabularies vocabularies={vocabularies} />
      </div>
    );
  }
}

export default DailyVocabularies;
