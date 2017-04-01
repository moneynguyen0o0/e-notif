import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Navigation from '../components/Navigation';
import { title, meta } from '../../config/assets';
import { isClient } from '../../config/app';

if (isClient) {
  require('styles/app.css');
}

class Page extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    return (
      <div className="page">
        <Helmet title={title} meta={meta} />
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
