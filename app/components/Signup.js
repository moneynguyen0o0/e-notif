import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, propTypes as reduxFormPropTypes, Field } from 'redux-form';
import { signup } from '../actions/users';
import Spinner from './icons/Spinner';

const validate = (account) => {
  const errors = {};

  if (!account.firstname) {
    errors.firstname = 'Required';
  } else if (account.firstname.length > 15) {
    errors.firstname = 'Must be 15 characters or less';
  }

  if (!account.lastname) {
    errors.lastname = 'Required';
  } else if (account.lastname.length > 15) {
    errors.lastname = 'Must be 15 characters or less';
  }

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

class SignupForm extends Component {
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
        <Field name="firstname" type="text" component={this._renderField} label="First name" />
        <Field name="lastname" type="text" component={this._renderField} label="Last name" />
        <Field name="email" type="email" component={this._renderField} label="Email" />
        <Field name="password" type="password" component={this._renderField} label="Password" />
        <div className="Signup-footer">
          <button type="submit" className="btn-info" disabled={submitting}>Log In</button>
        </div>
      </form>
    );
  }
}

const SignupContainer = reduxForm({
  form: 'registerForm',
  validate,
})(SignupForm);

class SignupWrapper extends Component {
  static propTypes = {
    user: PropTypes.object,
    signup: PropTypes.func.isRequired
  }

  _signup = (account) => {
    this.props.signup(account);
  }

  render() {
    const {
      user: { isWaiting, message } = {}
    } = this.props;

    if (isWaiting) {
      return <Spinner />;
    }

    return (
      <div className="Signup">
        <h3>{message}</h3>
        <SignupContainer onSubmit={this._signup} />
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
export default connect(mapStateToProps, { signup })(SignupWrapper);
