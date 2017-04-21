import React, { Component } from 'react';
import Helmet from 'react-helmet';
import SearchVocabularies from '../components/SearchVocabularies';

class SearchPage extends Component {
  render() {
    return (
      <div className="SearchPage">
        <Helmet title="Search | ENotif" />
        <div className="container">
          <SearchVocabularies />
        </div>
      </div>
    );
  }
}

export default SearchPage;
