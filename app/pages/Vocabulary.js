import React, { Component } from 'react';
import VocabularyComponent from '../components/vocabulary/Vocabulary';

class Vocabulary extends Component {
  render() {
    return (
      <div className="VocabularyPage">
        <div className="container">
          <VocabularyComponent />
        </div>
      </div>
    );
  }
}

export default Vocabulary;
