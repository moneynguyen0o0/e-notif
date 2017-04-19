import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { searchVocabularies } from '../utils/api';
import Spinner from './icons/Spinner';
import Vocabularies from './Vocabularies';

class SearchVocabularies extends Component {
  static contextTypes = {
    location: PropTypes.object.isRequired
  }

  state = {
    vocabularies: null
  }

  componentDidMount() {
    const {
      location: {
        query
      }
    } = this.context;

    if (!_.isEmpty(query)) {
      searchVocabularies(query).then((vocabularies) => {
        this.setState({ vocabularies });
      });
    } else {
      this.setState({ vocabularies: [] });
    }
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

export default SearchVocabularies;
