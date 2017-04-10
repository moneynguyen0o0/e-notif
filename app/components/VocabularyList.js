import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import Modal from 'react-modal';
import { Link } from 'react-router';
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
    modalIsOpen: false
  }

  componentDidMount() {
    this.props.fetchVocabularies();
  }

  _onEdit(vocabulary) {
    this.setState({
      vocabulary,
      modalIsOpen: true
    });
  }

  _onRemove(id) {
    this.props.removeVocabulary(id);
  }

  _saveVocabulary(vocabulary) {
    this.props.saveVocabulary(vocabulary);

    this.setState({
      modalIsOpen: false
    });
  }

  _openModal() {
    this.setState({
      vocabulary: undefined,
      modalIsOpen: true
    });
  }

  _closeModal() {
    this.setState({
      modalIsOpen: false
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
      modalIsOpen
    } = this.state;

    if (!vocabularies) {
      return <Spinner />;
    }

    const columns = [{
      header: 'VOCABULARIES',
      columns: [
        {
          header: 'Word',
          accessor: 'word',
          render: props => <Link to={`/vocabularies/${props.row.id}`}>{props.value}</Link>,
          width: 200
        }, {
          header: 'Pronunciation',
          accessor: 'pronunciation',
          width: 200
        }, {
          header: 'P.O.S',
          accessor: 'pos',
          width: 150
        }, {
          header: 'Definitions',
          id: 'definitions',
          accessor: vocabulary => vocabulary.definitions.map(definition => {
            return <div>- {definition}</div>;
          })
        }, {
          header: 'Examples',
          id: 'examples',
          accessor: vocabulary => vocabulary.examples.map(example => {
            return <div>- {example}</div>;
          })
        }, {
          header: '',
          id: 'options',
          width: 100,
          accessor: vocabulary => <div className="text-center">
            <a onClick={() => this._onEdit(vocabulary)}>
              <i className="fa fa-pencil-square-o" />
            </a>
            <a onClick={() => this._onRemove(vocabulary.id)}>
              <i className="fa fa-trash" />
            </a>
          </div>
        }
      ]
    }];

    return (
      <div className="VocabularyList">
        <div className="VocabularyList-addContainer"><button className="btn-primary" onClick={() => this._openModal()}>Create New</button></div>
        <Modal
          isOpen={modalIsOpen}
          contentLabel="Vocabulary">

          <div className="Modal-title">
            <h1>Vocabulary form</h1>
            <button className="btn-danger" onClick={() => this._closeModal()}>X</button>
          </div>

          {/* TODO: implement later */}
          {isWaiting && <div>Saving</div>}
          {message && <div>{message}</div>}

          <VocabularyForm vocabulary={vocabulary} saveVocabulary={(vocabulary) => this._saveVocabulary(vocabulary)} />
        </Modal>
        <ReactTable
          data={vocabularies}
          columns={columns}
          defaultPageSize={10}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ vocabulary }) => {
  return vocabulary;
};

export default connect(mapStateToProps, { fetchVocabularies, saveVocabulary, removeVocabulary })(VocabularyList);
