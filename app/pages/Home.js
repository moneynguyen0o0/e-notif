import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { getVocabularies } from '../utils/api';
import VocabularyList from '../components/VocabularyList';

class Home extends Component {
  state = {
    vocabularies: []
  }

  componentDidMount() {
    getVocabularies().then((vocabularies) => {
      this.setState({ vocabularies });
    });
  }
  render() {
    const { vocabularies } = this.state;

    return (
      <div className="home">
        <Helmet title="Home | ENotif" />
        <VocabularyList data={vocabularies} />
      </div>
    );
  }
}

export default Home;
