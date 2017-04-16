import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import Modal from 'react-modal';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetch as fetchVocabularies, save as saveVocabulary, remove as removeVocabulary } from '../actions/vocabulary';
import Spinner from './icons/Spinner';
import Mark from './Mark';
import VocabularyForm from './VocabularyForm';

const editStyles = {
  content: {
    overflowY: 'scroll'
  }
};

class VocabularyList extends Component {
  static propTypes = {
    user: PropTypes.object,
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
    isEditingModal: false,
    isDeletingModal: false
  }

  componentDidMount() {
    this.props.fetchVocabularies();
  }

  _edit(vocabulary) {
    this.setState({
      vocabulary,
      isEditingModal: true
    });
  }

  _remove() {
    const { deletingId } = this.state;

    if (deletingId) {
      this.props.removeVocabulary(deletingId);
    }

    this.setState({ isDeletingModal: false });
  }

  _saveVocabulary(vocabulary) {
    this.props.saveVocabulary(vocabulary);

    this.setState({
      isEditingModal: false
    });
  }

  _openEditingModal() {
    this.setState({
      vocabulary: undefined,
      isEditingModal: true
    });
  }

  _closeEditingModal() {
    this.setState({
      isEditingModal: false
    });
  }

  _openDeletingModal(_id) {
    this.setState({
      deletingId: _id,
      isDeletingModal: true
    });
  }

  _closeDeletingModal() {
    this.setState({
      isDeletingModal: false
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
      isEditingModal,
      isDeletingModal
    } = this.state;

    if (!vocabularies) {
      return <Spinner />;
    }

    const { user: { _id: userId } } = this.props;

    const customRow = {
      whiteSpace: 'normal'
    };

    const columns = [{
      header: 'VOCABULARIES',
      columns: [
        {
          header: 'Word',
          accessor: 'word',
          render: props => <Link to={`/vocabularies/${props.row._id}`}>{props.value}</Link>,
          width: 200
        }, {
          header: 'Pronunciation',
          accessor: 'pronunciation',
          width: 200
        }, {
          header: 'P.O.S',
          id: 'pos',
          width: 200,
          accessor: vocabulary => vocabulary.pos.map((item, index) => {
            const content = `${index !== 0 ? ', ' : ''}${item}`;
            return <span key={index}>{content}</span>;
          })
        }, {
          header: 'Definitions',
          id: 'definitions',
          accessor: vocabulary => vocabulary.definitions.map((definition, index) => {
            return <div key={index} style={customRow}>- {definition}</div>;
          })
        }, {
          header: 'Examples',
          id: 'examples',
          accessor: vocabulary => vocabulary.examples.map((example, index) => {
            return <div key={index} style={customRow}>- {example}</div>;
          })
        }, {
          header: '',
          id: 'mark',
          width: 50,
          accessor: vocabulary => {
            const { _id, users = [] } = vocabulary;
            const index = users.findIndex(item => item === userId);
            const marked = index !== -1;

            return (
              <div className="text-center">
                <Mark id={_id} marked={marked} />
              </div>
            );
          }
        }, {
          header: '',
          id: 'options',
          width: 100,
          accessor: vocabulary => <div className="text-center">
            <a onClick={() => this._edit(vocabulary)}>
              <i className="fa fa-pencil-square-o" />
            </a>
            <a onClick={() => this._openDeletingModal(vocabulary._id)}>
              <i className="fa fa-trash" />
            </a>
          </div>
        }
      ]
    }];

    return (
      <div className="VocabularyList">
        <div className="btn-container"><button className="btn-primary" onClick={() => this._openEditingModal()}>Create New</button></div>
        <Modal
          isOpen={isDeletingModal}
          contentLabel="Vocabulary-Editing">

          <div className="Modal-title">
            <h1>Warning</h1>
          </div>

          <div className="text-right">
            <button className="btn-default" onClick={() => this._closeDeletingModal()}>Cancel</button>
            <button className="btn-primary" onClick={() => this._remove()}>Delete</button>
          </div>
        </Modal>
        <Modal
          isOpen={isEditingModal}
          style={editStyles}
          contentLabel="Vocabulary-Editing">

          <div className="Modal-title">
            <h1>Vocabulary form</h1>
            <button className="btn-danger" onClick={() => this._closeEditingModal()}>X</button>
          </div>

          {/* TODO: implement later */}
          {isWaiting && <h3>Saving</h3>}
          {message && <h4>{message}</h4>}

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

const mapStateToProps = ({ vocabulary, user }) => {
  return { ...vocabulary, user };
};

export default connect(mapStateToProps, { fetchVocabularies, saveVocabulary, removeVocabulary })(VocabularyList);
