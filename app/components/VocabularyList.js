import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetch as fetchVocabularies, save as saveVocabulary, remove as removeVocabulary } from '../actions/vocabulary';
import Spinner from './icons/Spinner';
import VocabularyForm from './VocabularyForm';

class VocabularyList extends Component {
  static propTypes = {
    vocabularies: PropTypes.array,
    message: PropTypes.string,
    isWaiting: PropTypes.bool,
    fetchVocabularies: PropTypes.func.isRequired,
    saveVocabulary: PropTypes.func.isRequired,
    removeVocabulary: PropTypes.func.isRequired
  }

  state = {
    vocabularies: [],
    vocabulary: undefined,
    showForm: false
  }

  componentDidMount() {
    this.props.fetchVocabularies();
  }

  _onCreate() {
    this.setState({
      vocabulary: undefined,
      showForm: true
    });
  }

  _onEdit(vocabulary) {
    this.setState({
      vocabulary,
      showForm: true
    });
  }

  _onRemove(id) {
    this.props.removeVocabulary(id);
  }

  _onCancel() {
    this.setState({
      showForm: false
    });
  }

  _saveVocabulary(vocabulary) {
    this.props.saveVocabulary(vocabulary);

    this.setState({
      showForm: false
    });
  }

  render() {
    const {
      vocabularies,
      message,
      isWaiting
    } = this.props;

    const {
      vocabulary,
      showForm
    } = this.state;

    if (!vocabularies) {
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
          <div><a onClick={() => this._onEdit(vocabulary)}>Edit</a></div>
          <div><a onClick={() => this._onRemove(id)}>Remove</a></div>
        </div>
      );
    });

    return (
      <div className="vocabulary-list">
        {isWaiting && <span>Saving</span>}
        {message && <span>{message}</span>}
        <div><a onClick={() => this._onCreate()}>Create</a></div>
        {
          showForm && <div>
            <div onClick={() => this._onCancel()}>Cancel</div>
            <VocabularyForm vocabulary={vocabulary} saveVocabulary={(vocabulary) => this._saveVocabulary(vocabulary)} />
          </div>
        }
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ vocabulary }) => {
  return vocabulary;
};

export default connect(mapStateToProps, { fetchVocabularies, saveVocabulary, removeVocabulary })(VocabularyList);
