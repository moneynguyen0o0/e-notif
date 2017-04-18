import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from './icons/Spinner';
import Mark from './Mark';

class DailyVocabularies extends Component {
  static propTypes = {
    vocabularies: PropTypes.array,
    user: PropTypes.object
  }

  render() {
    const {
      vocabularies
    } = this.props;

    if (!vocabularies.length) {
      return <Spinner />;
    }

    const { user: { _id: userId } } = this.props;

    const content = vocabularies.map((vocabulary, index) => {
      const {
        _id,
        word,
        pronunciation,
        pos,
        definitions,
        examples,
        users = []
      } = vocabulary;

      const marked = users.findIndex(item => item === userId) !== -1;

      const markContent = <Mark id={_id} marked={marked} />;

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
        <div key={index}>
          <div className="Vocabulary-word">{word}</div>
          <div className="Vocabulary-pronunciation">[ {pronunciation} ]</div>
          <div className="Vocabulary-title">P.O.S</div>
          <div className="Vocabulary-pos">{posContent}</div>
          <div className="Vocabulary-title">Definitions</div>
          <div className="Vocabulary-definition">{definitionContent}</div>
          <div className="Vocabulary-title">Exmaples</div>
          <div className="Vocabulary-example">{exampleContent}</div>
          <div className="Vocabulary-mark">{markContent}</div>
        </div>
      );
    });

    return (
      <div className="DailyVocabularies">
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(DailyVocabularies);
