import React, { Component } from 'react';
import Helmet from 'react-helmet';
import MarkedVocabularies from '../components/MarkedVocabularies';

class MarkedVocabulariesPage extends Component {
  render() {
    return (
      <div className="MarkedVocabulariesPage">
        <Helmet title="My vocabularies | ENotif" />
        <div className="container-fluid">
          <MarkedVocabularies />
        </div>
      </div>
    );
  }
}

export default MarkedVocabulariesPage;
