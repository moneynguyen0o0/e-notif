import classnames from 'classnames';
import React, { Component } from 'react';
import { reduxForm, propTypes as reduxFormPropTypes, Field } from 'redux-form';
import { forgotPassword } from '../../utils/api';
import Spinner from '../icons/Spinner';
import Message from '../shared/Message';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

class ForgotPassword extends Component {
  static propTypes = {
    ...reduxFormPropTypes
  }

  _renderField = ({ input, label, type, meta: { touched, error } }) => {
    const groupClassnames = classnames(
      'form-group',
      { 'form-error': touched && error }
    );

    return (
      <div className={groupClassnames}>
        <label htmlFor={input.name}>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="email" type="email" component={this._renderField} label="Email" />
        <div className="ForgotPassword-footer">
          <button type="submit" className="btn-info" disabled={submitting}>Submit</button>
        </div>
      </form>
    );
  }
}

const ForgotPasswordContainer = reduxForm({
  form: 'forgotPasswordForm',
  validate,
})(ForgotPassword);

class ForgotPasswordWrapper extends Component {
  state = {
    isWaiting: false,
    message: null,
    showMessage: true
  }

  _send = (values) => {
    forgotPassword(values).then(() => {
      this.setState({
        isWaiting: false,
        message: {
          type: 'success',
          text: 'A mail sent. Please check it'
        },
        showMessage: true
      });
    }).catch((err) => {
      let text = 'Error! Something is wrong!';

      const { status } = err.response;

      if (status === 404) {
        text = 'Email not found';
      } else if (status === 498) {
        text = 'Can not handle now';
      }

      this.setState({
        isWaiting: false,
        message: {
          type: 'error',
          text
        },
        showMessage: true
      });
    });

    this.setState({ isWaiting: true });
  }

  _closeMessage() {
    this.setState({ showMessage: false });
  }

  render() {
    const {
      isWaiting, message, showMessage
    } = this.state;

    if (isWaiting) {
      return <Spinner />;
    }

    if (message && showMessage) {
      const { type, text } = message;

      return (
        <Message type={type} text={text} close={() => this._closeMessage()} />
      );
    }

    return (
      <div className="ForgotPassword">
        <ForgotPasswordContainer onSubmit={this._send} />
      </div>
    );
  }
}

export default ForgotPasswordWrapper;
