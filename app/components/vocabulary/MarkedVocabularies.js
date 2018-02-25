import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router';
import { getMarkedVocabularies } from '../../utils/API';
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
          accessor: vocabulary => <div className="text-center">
            <Mark id={vocabulary._id} marked />
          </div>
        }
      ]
    }];

    return (
      <div className="MarkedVocabularies">
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
