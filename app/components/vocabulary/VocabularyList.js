import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import Modal from 'react-modal';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetch as fetchVocabularies, save as saveVocabulary, remove as removeVocabulary } from '../../actions/vocabulary';
import { getPOS } from '../../utils/API';
import Spinner from '../icons/Spinner';
import Mark from '../shared/Mark';
import Audio from '../media/Audio';
import VocabularyForm from './VocabularyForm';

const editStyles = {
  content: {
    overflowY: 'scroll'
  }
};

const loadingStyles = {
  content: {
    width: '200px',
    padding: '35px'
  }
};

class VocabularyList extends Component {
  static propTypes = {
    user: PropTypes.object,
    vocabularies: PropTypes.array,
    message: PropTypes.string,
    isWaiting: PropTypes.bool,
    success: PropTypes.bool,
    fetchVocabularies: PropTypes.func.isRequired,
    saveVocabulary: PropTypes.func.isRequired,
    removeVocabulary: PropTypes.func.isRequired
  }

  state = {
    POS: [],
    vocabulary: undefined,
    isEditingModal: false,
    isDeletingModal: false,
    showErrorMessage: false
  }

  componentDidMount() {
    this.props.fetchVocabularies();
    getPOS().then(data => this.setState({ POS: data }));
  }

  componentWillReceiveProps(nextProps) {
    const { message, success } = nextProps;

    if (success) {
      this._closeEditingModal();
    }

    if (message !== '') {
      this.setState({
        showErrorMessage: true
      });
    }
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
      vocabulary
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

  _handleCloseErrorMessageModal() {
    this.setState({
      showErrorMessage: false
    });
  }

  _download() {
    window.open('/api/vocabularies/download', '_blank');
  }

  render() {
    const {
      vocabularies = [],
      user: {
        data: {
          _id: userId
        }
      },
      isWaiting,
      message
    } = this.props;

    const {
      vocabulary,
      isEditingModal,
      isDeletingModal,
      POS,
      showErrorMessage
    } = this.state;

    if (!vocabularies.length) {
      return <Spinner />;
    }

    const customRow = {
      whiteSpace: 'normal'
    };

    const columns = [{
      Header: 'VOCABULARIES',
      columns: [
        {
          Header: 'Word',
          accessor: 'word',
          render: props => <Link to={`/vocabularies/${props.row._id}`}>{props.value}</Link>,
          width: 150,
          filterable: true,
          filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        }, {
          Header: 'Pronunciation',
          accessor: 'pronunciation',
          width: 150
        }, {
          Header: 'P.O.S',
          id: 'pos',
          width: 150,
          accessor: vocabulary => vocabulary.pos.map((item, index) => {
            const content = `${index !== 0 ? ', ' : ''}${item}`;
            return <span key={index}>{content}</span>;
          })
        }, {
          Header: 'Definitions',
          id: 'definitions',
          accessor: vocabulary => vocabulary.definitions.map((definition, index) => {
            return <div key={index} style={customRow}>- {definition}</div>;
          })
        }, {
          Header: 'Examples',
          id: 'examples',
          accessor: vocabulary => vocabulary.examples.map((example, index) => {
            return <div key={index} style={customRow}>- {example}</div>;
          })
        }, {
          Header: '',
          id: 'audio',
          width: 50,
          accessor: vocabulary => {
            const { _id, audio } = vocabulary;

            return (
              <div className="text-center">
                {audio && <Audio key={_id} src={audio} />}
              </div>
            );
          }
        }, {
          Header: '',
          id: 'mark',
          width: 50,
          accessor: vocabulary => {
            const { _id, users = [] } = vocabulary;
            const index = users.findIndex(item => item === userId);
            const marked = index !== -1;

            return (
              <div className="text-center">
                <Mark key={_id} id={_id} marked={marked} />
              </div>
            );
          }
        }, {
          Header: '',
          id: 'options',
          width: 75,
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
            <button className="btn-primary margin-left" onClick={() => this._remove()}>Delete</button>
          </div>
        </Modal>
        <Modal
          isOpen={isEditingModal}
          style={editStyles}
          contentLabel="Vocabulary-Editing">

          <div className="Modal-title">
            <h1>Vocabulary form</h1>
            <button className="btn-danger" onClick={() => this._closeEditingModal()}><i className="fa fa-times" /></button>
          </div>

          <Modal isOpen={isWaiting} style={loadingStyles} contentLabel="Handling">
            <Spinner type="bars" />
          </Modal>
          <Modal isOpen={showErrorMessage} contentLabel="Error-message" onRequestClose={() => this._handleCloseErrorMessageModal()}>
            <div className="text-danger">
              {message}
            </div>
          </Modal>

          <VocabularyForm POS={POS} vocabulary={vocabulary} saveVocabulary={(vocabulary) => this._saveVocabulary(vocabulary)} />
        </Modal>
        <ReactTable
          data={vocabularies}
          columns={columns}
          defaultPageSize={10}
        />
        <div className="btn-container"><a className="button btn-success" onClick={() => this._download()}>Export</a></div>
      </div>
    );
  }
}

const mapStateToProps = ({ vocabulary, user }) => {
  return { ...vocabulary, user };
};

export default connect(mapStateToProps, { fetchVocabularies, saveVocabulary, removeVocabulary })(VocabularyList);
