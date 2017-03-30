import React, { Component } from 'react';
import Helmet from 'react-helmet';
import VocaList from '../components/VocaList';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Helmet title="Home | ENotif" />
        <VocaList />
      </div>
    );
  }
}

export default Home;
