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

    return (
      <div className="voca-list">
        {
          data.map((item, index) => {
            const {
              word,
              pronunciation,
              pos
            } = item;

            return (
              <div key={index}>
                <h3>{word}</h3>
                <div><i>/{pronunciation}/</i></div>
                <h5>{pos}</h5>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default VocaList;
