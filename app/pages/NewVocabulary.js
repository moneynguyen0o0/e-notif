import React, { Component } from 'react';
import Helmet from 'react-helmet';
import VocabularyForm from '../components/VocabularyForm';

class NewVocabulary extends Component {
  render() {
    return (
      <div className="new-vocabulary">
        <Helmet title="Create new vocabulary | ENotif" />
        <VocabularyForm />
      </div>
    );
  }
}

export default NewVocabulary;
