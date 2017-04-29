import React, { Component } from 'react';
import Helmet from 'react-helmet';
import VocabularyList from '../components/vocabulary/VocabularyList';

class ManageVocabularies extends Component {
  render() {
    return (
      <div className="ManageVocabulariesPage">
        <Helmet title="Manage vocabularies | ENotif" />
        <div className="container-fluid">
          <VocabularyList />
        </div>
      </div>
    );
  }
}

export default ManageVocabularies;
