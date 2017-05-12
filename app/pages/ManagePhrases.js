import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PhraseList from '../components/phrase/PhraseList';

class ManagePhrases extends Component {
  render() {
    return (
      <div className="ManagePhrasesPage">
        <Helmet title="My phrases | ENotif" />
        <div className="container-fluid">
          <PhraseList />
        </div>
      </div>
    );
  }
}

export default ManagePhrases;
