import React, { Component, PropTypes } from 'react';
import { verifyMail } from '../../utils/api';
import Message from '../shared/Message';

export default class VerifyEmail extends Component {
  static contextTypes = {
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }

  state = {
    message: 'Verifying...! Please waite a second!'
  }

  componentDidMount() {
    const { location, router } = this.context;

    verifyMail(location.query.token).then(() => router.push('/')).catch(() => this.setState({ message: 'Error! Something is wrong!' }));
  }

  render() {
    return (
      <Message type="info" text={this.state.message} />
    );
  }
}
