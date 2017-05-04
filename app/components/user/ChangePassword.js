import classnames from 'classnames';
import React, { Component } from 'react';
import { reduxForm, propTypes as reduxFormPropTypes, Field } from 'redux-form';
import { changePassword } from '../../utils/api';
import Spinner from '../icons/Spinner';

const validate = (values) => {
  const errors = {};

  if (!values.currentPassword) {
    errors.currentPassword = 'Required';
  } else if (values.currentPassword.length > 15) {
    errors.currentPassword = 'Must be 15 characters or less';
  }

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

class ChangePassword extends Component {
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
        <Field name="currentPassword" type="password" component={this._renderField} label="Current password" />
        <Field name="newPassword" type="password" component={this._renderField} label="New password" />
        <Field name="confirmPassword" type="password" component={this._renderField} label="Confirm password" />
        <div className="ChangePassword-footer">
          <button type="submit" className="btn-info" disabled={submitting}>Change</button>
        </div>
      </form>
    );
  }
}

const ChangePasswordContainer = reduxForm({
  form: 'changePasswordForm',
  validate,
})(ChangePassword);

class ChangePasswordWrapper extends Component {
  state = {
    isWaiting: false,
    message: ''
  }

  _change = (values) => {
    changePassword(values).then(() => {
      this.setState({
        isWaiting: false,
        message: 'Password changed success'
      });
    }).catch((err) => {
      let message = 'Something went wrong updating the data';

      if (err.response.status === 401) {
        message = 'New password is not match current one';
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
      <div className="ChangePassword">
        {message && <div className="ChangePassword-message">{message}</div>}
        <ChangePasswordContainer onSubmit={this._change} />
      </div>
    );
  }
}

export default ChangePasswordWrapper;
