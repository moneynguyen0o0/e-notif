import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { getVocas } from '../utils/api';
import VocabularyList from '../components/VocabularyList';

class Home extends Component {
  state = {
    vocabularies: []
  }

  componentDidMount() {
    getVocas().then((vocabularies) => {
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
