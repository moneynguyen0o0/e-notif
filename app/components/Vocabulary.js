import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { findVocabulary } from '../utils/api';
import Spinner from './icons/Spinner';

export default class Vocabulary extends Component {
  static contextTypes = {
    params: PropTypes.object.isRequired
  }

  state = {
    vocabulary: null
  }

  componentDidMount() {
    const {
      params: { id: _id }
    } = this.context;

    console.log(this.context);

    findVocabulary(_id).then((vocabulary) => {
      this.setState({ vocabulary });
    });
  }

  render() {
    const { vocabulary } = this.state;

    if (!vocabulary) {
      return <Spinner />;
    }

    const {
      word,
      pronunciation,
      pos,
      definitions,
      examples
    } = vocabulary;

    const posContent = pos.map((item, index) => {
      const content = `${index !== 0 ? ', ' : ''}${item}`;
      return <span key={index}>{content}</span>;
    });
    const definitionContent = definitions.map((definition, index) => {
      return <div key={index}>- {definition}</div>;
    });
    const exampleContent = examples.map((example, index) => {
      return <div key={index}>- {example}</div>;
    });

    return (
      <div className="Vocabulary">
        {vocabulary && <Helmet title={`${vocabulary.word} | ENotif`} />}
        <div className="Vocabulary-word">{word}</div>
        <div className="Vocabulary-pronunciation">[ {pronunciation} ]</div>
        <div className="Vocabulary-title">P.O.S</div>
        <div className="Vocabulary-pos">{posContent}</div>
        <div className="Vocabulary-title">Definitions</div>
        <div className="Vocabulary-definition">{definitionContent}</div>
        <div className="Vocabulary-title">Exmaples</div>
        <div className="Vocabulary-example">{exampleContent}</div>
      </div>
    );
  }
}
