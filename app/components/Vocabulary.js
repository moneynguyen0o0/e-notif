import React, { Component } from 'react';
import Spinner from './Spinner';
import { findVoca } from '../utils/api';

export default class Vocabulary extends Component {
  state = {
    voca: null
  }

  componentDidMount() {
    findVoca().then((voca) => {
      this.setState({ voca });
    });
  }

  render() {
    const { voca } = this.state;

    if (!voca) {
      return <Spinner />;
    }

    const {
      word,
      pronunciation,
      pos,
      definitions,
      examples
    } = voca;

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
  }
}
