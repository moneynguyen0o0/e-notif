import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Navigation from '../components/Navigation';
import { title, meta, link } from '../../config/assets';
import { isClient } from '../../config/app';

if (isClient) {
  require('styles/app.css');
}

class Page extends Component {
  render() {
    return (
      <div className="page">
        <Helmet title={title} link={link} meta={meta} />
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
