import React, { Component } from 'react';
import { getVocas } from '../utils/api';
import Spinner from './Spinner';

class VocaList extends Component {
  state = {
    vocas: null
  }

  componentDidMount() {
    getVocas().then((vocas) => {
      this.setState({ vocas });
    });
  }

  render() {
    const { vocas } = this.state;

    if (!vocas) {
      return <Spinner />;
    }

    const content = vocas.map((voca, index) => {
      const {
        word,
        pronunciation,
        pos,
        definitions,
        examples
      } = voca;

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
        </div>
      );
    });

    return (
      <div className="voca-list">
        {content}
      </div>
    );
  }
}

export default VocaList;
