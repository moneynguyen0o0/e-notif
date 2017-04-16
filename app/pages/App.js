import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Navigation from '../components/core/Navigation';
import { title, meta } from '../../config/assets';
import { isClient } from '../../config/app';

if (isClient) {
  require('styles/app.css');
}

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }

  static childContextTypes = {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }

  getChildContext() {
    const { location, params, router } = this.props;

    return { location, params, router };
  }

  render() {
    return (
      <div className="App">
        <Helmet title={title} meta={meta} />
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

export default App;
