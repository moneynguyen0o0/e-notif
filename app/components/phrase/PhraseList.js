import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fetch as fetchPhrases, save as savePhrase, remove as removePhrase } from '../../actions/phrase';
import Spinner from '../icons/Spinner';
import PhraseForm from './PhraseForm';

class PhraseList extends Component {
  static propTypes = {
    phrases: PropTypes.array,
    message: PropTypes.string,
    isWaiting: PropTypes.bool,
    fetchPhrases: PropTypes.func.isRequired,
    savePhrase: PropTypes.func.isRequired,
    removePhrase: PropTypes.func.isRequired
  }

  state = {
    phrase: undefined,
    isEditingModal: false,
    isDeletingModal: false
  }

  componentDidMount() {
    this.props.fetchPhrases();
  }

  _edit(phrase) {
    this.setState({
      phrase,
      isEditingModal: true
    });
  }

  _remove() {
    const { deletingId } = this.state;

    if (deletingId) {
      this.props.removePhrase(deletingId);
    }

    this.setState({ isDeletingModal: false });
  }

  _savePhrase(phrase) {
    this.props.savePhrase(phrase);

    this.setState({
      isEditingModal: false
    });
  }

  _openEditingModal() {
    this.setState({
      phrase: undefined,
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
      phrases,
      message,
      isWaiting
    } = this.props;

    const {
      phrase,
      isEditingModal,
      isDeletingModal
    } = this.state;

    if (!phrases) {
      return <Spinner />;
    }

    const customRow = {
      whiteSpace: 'normal'
    };

    const columns = [{
      header: 'PHRASES',
      columns: [
        {
          header: 'Content',
          accessor: 'content',
          render: props => <div style={customRow}>{props.value}</div>
        }, {
          header: 'Notes',
          accessor: 'note',
          render: props => <div style={customRow}>{props.value}</div>
        }, {
          header: '',
          id: 'options',
          width: 75,
          accessor: phrase => <div className="text-center">
            <a onClick={() => this._edit(phrase)}>
              <i className="fa fa-pencil-square-o" />
            </a>
            <a onClick={() => this._openDeletingModal(phrase._id)}>
              <i className="fa fa-trash" />
            </a>
          </div>
        }
      ]
    }];

    return (
      <div className="PhraseList">
        <div className="btn-container"><button className="btn-primary" onClick={() => this._openEditingModal()}>Create New</button></div>
        <Modal
          isOpen={isDeletingModal}
          contentLabel="Phrase-Editing">

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
          contentLabel="Phrase-Editing">

          <div className="Modal-title">
            <h1>Phrase form</h1>
            <button className="btn-danger" onClick={() => this._closeEditingModal()}>X</button>
          </div>

          {/* TODO: implement later */}
          {isWaiting && <h3>Saving</h3>}
          {message && <h4>{message}</h4>}

          <PhraseForm phrase={phrase} savePhrase={(phrase) => this._savePhrase(phrase)} />
        </Modal>
        <ReactTable
          data={phrases}
          columns={columns}
          defaultPageSize={10}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ phrase, user }) => {
  return { ...phrase, user };
};

export default connect(mapStateToProps, { fetchPhrases, savePhrase, removePhrase })(PhraseList);
