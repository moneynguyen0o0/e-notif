import React, { Component } from 'react';
import Helmet from 'react-helmet';
import VocaForm from '../components/VocaForm';

class AddVoca extends Component {
  render() {
    return (
      <div className="voca-creation">
        <Helmet title="Voca Creation | ENotif" />
        <VocaForm />
      </div>
    );
  }
}

export default AddVoca;
