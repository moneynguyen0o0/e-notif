import React, { Component } from 'react';
import { getAllVocabularies, deleteVocabulary } from '../utils/api';
import Spinner from './icons/Spinner';

class VocabularyList extends Component {
  state = {
    vocabularies: []
  }

  componentDidMount() {
    getAllVocabularies().then((vocabularies) => {
      this.setState({ vocabularies });
    });
  }

  render() {
    const { vocabularies } = this.state;

    if (!vocabularies.length) {
      return <Spinner />;
    }

    const content = vocabularies.map((vocabulary, index) => {
      const {
        id,
        word,
        pronunciation,
        pos,
        definitions,
        examples
      } = vocabulary;

      const definitionContents = definitions.map((definition, i) => {
        return <div key={i}>{definition}</div>;
      });
      const exampleContents = examples.map((example, i) => {
        return <div key={i}>{example}</div>;
      });

      return (
        <div key={index}>
          <h3>{word}</h3>
          <div><i>/{pronunciation}/</i></div>
          <h5>{pos}</h5>
          <h6>Definitions</h6>
          <div>{definitionContents}</div>
          <h6>Exmaples</h6>
          <div>{exampleContents}</div>
          <div><a onClick={() => this._onEdit(id)}>Edit</a></div>
          <div><a onClick={() => this._onRemove(id)}>Remove</a></div>
        </div>
      );
    });

    return (
      <div className="vocabulary-list">
        <div><a onClick={() => this._onCreate(id)}>Create</a></div>
        {content}
      </div>
    );
  }
}

export default VocabularyList;
