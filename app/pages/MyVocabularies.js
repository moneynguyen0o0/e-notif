import React, { Component } from 'react';
import Helmet from 'react-helmet';
import MarkedVocabularies from '../components/vocabulary/MarkedVocabularies';

class MyVocabularies extends Component {
  render() {
    return (
      <div className="MyVocabulariesPage">
        <Helmet title="My vocabularies | ENotif" />
        <div className="container-fluid">
          <MarkedVocabularies />
        </div>
      </div>
    );
  }
}

export default MyVocabularies;
