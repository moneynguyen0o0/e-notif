import React, { Component } from 'react';
import axios from 'axios';

export default class VocaList extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    axios.get('/api/data').then(res => {
      this.setState({ data: res.data });
    }).catch(err => console.log(err));
  }

  render() {
    const { data } = this.state;
    return (
      <h1>{data}</h1>
    );
  }
}
