import React, { Component } from 'react';
import Helmet from 'react-helmet';
import VocabularyList from '../components/VocabularyList';

class VocabularyManagement extends Component {
  render() {
    return (
      <div className="VocabularyManagement">
        <Helmet title="VocabularyManagement | ENotif" />
        <div className="container-fluid">
          <VocabularyList />
        </div>
      </div>
    );
  }
}

export default VocabularyManagement;
