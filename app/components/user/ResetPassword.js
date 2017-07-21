import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { reduxForm, propTypes as reduxFormPropTypes, Field } from 'redux-form';
import { resetPassword, checkToken } from '../../utils/API';
import Spinner from '../icons/Spinner';
import Message from '../shared/Message';

const validate = (values) => {
  const errors = {};

  if (!values.newPassword) {
    errors.newPassword = 'Required';
  } else if (values.newPassword.length > 15) {
    errors.newPassword = 'Must be 15 characters or less';
  }

  if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = 'Not match';
  }

  return errors;
};

class ResetPassword extends Component {
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
        <Field name="newPassword" type="password" component={this._renderField} label="New password" />
        <Field name="confirmPassword" type="password" component={this._renderField} label="Confirm password" />
        <div className="ResetPassword-footer">
          <button type="submit" className="btn-info" disabled={submitting}>Change</button>
        </div>
      </form>
    );
  }
}

const ResetPasswordContainer = reduxForm({
  form: 'resetPasswordForm',
  validate,
})(ResetPassword);

class ResetPasswordWrapper extends Component {
  static contextTypes = {
    location: PropTypes.object.isRequired
  }

  state = {
    isWaiting: true,
    message: '',
    showForm: false,
    showMessage: true
  }

  componentDidMount() {
    checkToken(this.context.location.query.token).then(() => {
      this.setState({
        isWaiting: false,
        showForm: true
      });
    }).catch((err) => {
      let message = 'Error! Something is wrong';

      if (err.response.status === 498) {
        message = 'Reset password expired';
      }

      this.setState({
        isWaiting: false,
        message
      });
    });
  }

  _change = (values) => {
    resetPassword(this.context.location.query.token, values).then(() => {
      this.setState({
        isWaiting: false,
        showForm: false,
        message: 'Password reseted success'
      });
    });

    this.setState({ isWaiting: true, showMessage: true });
  }

  _closeMessage() {
    this.setState({ showMessage: false });
  }

  render() {
    const {
      isWaiting, message, showForm, showMessage
    } = this.state;

    if (isWaiting) {
      return <Spinner />;
    }

    if (!showForm) {
      return <Message type="info" text={message} />;
    }

    if (message && showMessage) {
      return (
        <Message type="error" text={message} close={() => this._closeMessage()} />
      );
    }

    return (
      <div className="ResetPassword">
        <ResetPasswordContainer onSubmit={this._change} />
      </div>
    );
  }
}

export default ResetPasswordWrapper;
