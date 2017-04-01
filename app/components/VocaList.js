import React, { Component } from 'react';
import API from '../utils/api';
import Spinner from './Spinner';

class VocaList extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    API.getVocaList().then((data) => {
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;

    if (!data) {
      return <Spinner />;
    }

    const content = data.map((item, index) => {
      const {
        word,
        pronunciation,
        pos,
        definitions,
        examples
      } = item;

      const definitionContents = definitions.map(definition => {
        return <div>{definition}</div>;
      });
      const exampleContents = examples.map(example => {
        return <div>{example}</div>;
      });

      return (
        <div key={index}>
          <h3>{word}</h3>
          <div><i>/{pronunciation}/</i></div>
          <h5>{pos}</h5>
          <div>{definitionContents}</div>
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
