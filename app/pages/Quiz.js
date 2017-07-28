import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ListenAndType from '../components/quiz/ListenAndType';

class Quiz extends Component {
  render() {
    return (
      <div className="Quiz">
        <Helmet title="Listen & Type | ENotif" />
        <div className="container">
          <ListenAndType />
        </div>
      </div>
    );
  }
}

export default Quiz;
