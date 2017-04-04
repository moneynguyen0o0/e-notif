import React, { Component, PropTypes } from 'react';
import Spinner from './Spinner';

export default class Vocabulary extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    const { data } = this.props;

    if (!data) {
      return <Spinner />;
    }

    const {
      word,
      pronunciation,
      pos,
      definitions,
      examples
    } = data;

    const definitionContents = definitions.map((definition, i) => {
      return <div key={i}>{definition}</div>;
    });
    const exampleContents = examples.map((example, i) => {
      return <div key={i}>{example}</div>;
    });

    return (
      <div>
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
