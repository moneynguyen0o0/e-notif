import React, { Component } from 'react';
import Helmet from 'react-helmet';
import SearchCompenent from '../components/Search';

class Search extends Component {
  render() {
    return (
      <div className="SearchPage">
        <Helmet title="Search | ENotif" />
        <div className="container">
          <SearchCompenent />
        </div>
      </div>
    );
  }
}

export default Search;
