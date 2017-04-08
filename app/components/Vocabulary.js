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
      params: { id }
    } = this.context;

    console.log(this.context);

    findVocabulary(id).then((vocabulary) => {
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

    const definitionContents = definitions.map((definition, i) => {
      return <div key={i}>{definition}</div>;
    });
    const exampleContents = examples.map((example, i) => {
      return <div key={i}>{example}</div>;
    });

    return (
      <div>
        {vocabulary && <Helmet title={`${vocabulary.word} | ENotif`} />}
        <h3>{word}</h3>
        <div><i>/{pronunciation}/</i></div>
        <h5>{pos}</h5>
        <h6>Definitions</h6>
        <div>{definitionContents}</div>
        <h6>Exmaples</h6>
        <div>{exampleContents}</div>
      </div>
    );
  }
}
