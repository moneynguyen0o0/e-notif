import React, { Component } from 'react';
import Helmet from 'react-helmet';
import VocabularyList from '../components/VocabularyList';

class Home extends Component {
  render() {
    return (
      <div className="HomePage">
        <Helmet title="Home | ENotif" />
        <div className="container-fluid">
          <VocabularyList />
        </div>
      </div>
    );
  }
}

export default Home;
