import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, propTypes as reduxFormPropTypes, Field } from 'redux-form';
import { login } from '../../actions/users';
import Spinner from '../icons/Spinner';
import Message from '../shared/Message';

const validate = (user) => {
  const errors = {};

  if (!user.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
    errors.email = 'Invalid email address';
  }

  if (!user.password) {
    errors.password = 'Required';
  } else if (user.password.length > 15) {
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
        <div>
          <Field name="remember" component="input" type="checkbox" /> <label htmlFor="remember">Remember me</label>
        </div>
        <div className="Login-extra"><a href="/signup">Sign up now!</a><div className="Login-forgotPassword"><a href="/users/forgot-password">Forgot password!</a></div></div>
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

  state = {
    showMessage: false
  }

  _login = (user) => {
    this.props.login(user);

    this.setState({
      showMessage: true
    });
  }

  _closeMessage() {
    this.setState({ showMessage: false });
  }

  render() {
    const {
      user: { isWaiting, message } = {}
    } = this.props;

    const { showMessage } = this.state;

    if (isWaiting) {
      return <Spinner />;
    }

    if (message && showMessage) {
      return (
        <Message type="error" text={message} close={() => this._closeMessage()} />
      );
    }

    return (
      <div className="Login">
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
