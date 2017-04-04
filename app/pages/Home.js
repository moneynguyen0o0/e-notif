import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { getVocas } from '../utils/api';
import VocaList from '../components/VocaList';

class Home extends Component {
  state = {
    vocas: []
  }

  componentDidMount() {
    getVocas().then((vocas) => {
      this.setState({ vocas });
    });
  }
  render() {
    const { vocas } = this.state;

    return (
      <div className="home">
        <Helmet title="Home | ENotif" />
        <VocaList data={vocas} />
      </div>
    );
  }
}

export default Home;
