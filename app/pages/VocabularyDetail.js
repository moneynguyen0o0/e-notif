import React, { Component } from 'react';
import Vocabulary from '../components/Vocabulary';

class VocabularyDetail extends Component {
  render() {
    return (
      <div className="VocabularyDetailPage">
        <div className="container">
          <Vocabulary />
        </div>
      </div>
    );
  }
}

export default VocabularyDetail;
