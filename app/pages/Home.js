import React, { Component } from 'react';
import Helmet from 'react-helmet';
import DailyVocabularies from '../components/DailyVocabularies';

class Home extends Component {
  render() {
    return (
      <div className="HomePage">
        <Helmet title="Home | ENotif" />
        <div className="container">
          <DailyVocabularies />
        </div>
      </div>
    );
  }
}

export default Home;
