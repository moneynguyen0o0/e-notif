import React, { Component } from 'react';
import API from '../utils/api';
import Spinner from './Spinner'

export default class VocaList extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    setTimeout(() => {
      API.getVocaList().then(data => {
        console.log(data);
        this.setState({ data });
      }).catch(err => console.log(err));
    }, 3000);
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
