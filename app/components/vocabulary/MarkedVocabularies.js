import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router';
import { getMarkedVocabularies } from '../../utils/api';
import Spinner from '../icons/Spinner';
import Audio from '../media/Audio';
import Mark from '../shared/Mark';

class MarkedVocabularies extends Component {
  state = {
    vocabularies: []
  }

  componentDidMount() {
    getMarkedVocabularies().then((vocabularies) => {
      this.setState({ vocabularies });
    });
  }

  render() {
    const {
      vocabularies
    } = this.state;

    if (!vocabularies) {
      return <Spinner />;
    }

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
          id: 'audio',
          width: 50,
          accessor: vocabulary => {
            return (
              <div className="text-center">
                <Audio src={vocabulary.audio} />
              </div>
            );
          }
        }, {
          header: '',
          id: 'mark',
          width: 50,
          accessor: vocabulary => <div className="text-center">
            <Mark id={vocabulary._id} marked />
          </div>
        }
      ]
    }];

    return (
      <div className="MarkedVocabularies">
        <div className="btn-container"><button className="btn-primary" onClick={() => this._export()}>Export</button></div>
        <ReactTable
          data={vocabularies}
          columns={columns}
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default MarkedVocabularies;
