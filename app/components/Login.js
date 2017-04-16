import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, propTypes as reduxFormPropTypes, Field } from 'redux-form';
import { login } from '../actions/users';
import Spinner from './icons/Spinner';

const validate = (account) => {
  const errors = {};

  if (!account.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(account.email)) {
    errors.email = 'Invalid email address';
  }

  if (!account.password) {
    errors.password = 'Required';
  } else if (account.password.length > 15) {
    errors.password = 'Must be 15 characters or less';
  }

  return errors;
};

class LoginForm extends Component {
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
        <Field name="password" type="password" component={this._renderField} label="Password" />
        <div className="Login-footer">
          <button type="submit" className="btn-info" disabled={submitting}>Log In</button>
        </div>
      </form>
    );
  }
}

const LoginContainer = reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);

class LoginWrapper extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func.isRequired
  }

  _login = (account) => {
    this.props.login(account);
  }

  render() {
    const {
      user: { isWaiting, message } = {}
    } = this.props;

    if (isWaiting) {
      return <Spinner />;
    }

    return (
      <div className="Login">
        <h3 className="Login-message">{message}</h3>
        <LoginContainer onSubmit={this._login} />
      </div>
    );
  }
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
const mapStateToProps = ({ user }) => {
  return { user };
};

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, { login })(LoginWrapper);
