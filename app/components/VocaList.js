import React, { Component, PropTypes } from 'react';
import Spinner from './Spinner';

class VocaList extends Component {
  static propTypes = {
    data: PropTypes.array
  }

  render() {
    const { data } = this.props;

    if (!data.length) {
      return <Spinner />;
    }

    const content = data.map((voca, index) => {
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
