import React, { Component, PropTypes } from 'react';
import { verifyMail } from '../../utils/api';

export default class VerifyEmail extends Component {
  static contextTypes = {
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }

  state = {
    message: 'Verifying...'
  }

  componentDidMount() {
    const { location, router } = this.context;

    verifyMail(location.query.token).then(() => router.push('/')).catch(() => this.setState({ message: 'Error...' }));
  }

  render() {
    return (
      <div>{this.state.message}</div>
    );
  }
}
