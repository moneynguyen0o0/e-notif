import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { searchVocabularies } from '../utils/api';
import Spinner from './icons/Spinner';
import Vocabularies from './vocabulary/Vocabularies';

class Search extends Component {
  static contextTypes = {
    location: PropTypes.object.isRequired
  }

  state = {
    vocabularies: null
  }

  componentWillMount() {
    this._search = _.debounce(this._search, 500, { maxWait: 500 });
  }

  componentDidMount() {
    this._search(this.context.location.query);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newQuery = nextContext.location.query;
    const oldQuery = this.context.location.query;

    if (!_.isEqual(newQuery, oldQuery)) {
      this._search(newQuery);
    }
  }

  _search(query) {
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
      <div className="SearchVocabularies">
        <Vocabularies vocabularies={vocabularies} />
      </div>
    );
  }
}

export default Search;
