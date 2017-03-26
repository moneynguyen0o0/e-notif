import React, { Component } from 'react';
import Page from '../components/Page';
import Navigation from '../components/Navigation';
import { title, meta, link } from '../../config/assets';
import { isClient } from '../../config/app';

if (isClient) {
  require('styles/app.css');
}

class App extends Component {
  render() {
    return (
      <Page title={title} meta={meta} link={link}>
        <Navigation />
        {this.props.children}
      </Page>
    );
  }
}

export default App;
