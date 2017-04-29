import classnames from 'classnames';
import React, { Component } from 'react';
import { reduxForm, propTypes as reduxFormPropTypes, Field } from 'redux-form';
import { forgotPassword } from '../../utils/api';
import Spinner from '../icons/Spinner';

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
    message: ''
  }

  _send = (values) => {
    forgotPassword(values).then(() => {
      this.setState({
        isWaiting: false,
        message: 'A mail sent. Please check it'
      });
    }).catch((err) => {
      let message = 'A mail sent. Please check it';

      if (err.response.status === 404) {
        message = 'Email not found';
      }

      this.setState({
        isWaiting: false,
        message
      });
    });

    this.setState({ isWaiting: true });
  }

  render() {
    const {
      isWaiting, message
    } = this.state;

    if (isWaiting) {
      return <Spinner />;
    }

    return (
      <div className="ForgotPassword">
        <h3 className="ForgotPassword-message">{message}</h3>
        <ForgotPasswordContainer onSubmit={this._send} />
      </div>
    );
  }
}

export default ForgotPasswordWrapper;
