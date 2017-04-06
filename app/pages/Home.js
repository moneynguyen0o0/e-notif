import React, { Component } from 'react';
import Helmet from 'react-helmet';
import VocabularyList from '../components/VocabularyList';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Helmet title="Home | ENotif" />
        <VocabularyList />
      </div>
    );
  }
}

export default Home;
