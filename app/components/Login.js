import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login as loginAction, toggleLoginMode as toggleLoginModeAction } from '../actions/users';
import Spinner from './Spinner';

class Login extends Component {
  static PropTypes = {
    user: PropTypes.object,
    login: PropTypes.func.isRequired,
    toggleLoginMode: PropTypes.func.isRequired
  }

  _handleOnSubmit(event) {
    event.preventDefault();

    const { login } = this.props;
    const email = 'money@gmail.com';
    const password = 'money123';

    login({ email, password });
  }

  render() {
    const {
      user: { isWaiting, message } = {},
      toggleLoginMode
    } = this.props;

    if (!isWaiting) {
      return <Spinner />;
    }

    return (
      <div className="login">
        <h3>{message}</h3>
        <form onSubmit={(e) => this._handleOnSubmit(e)}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <p>{message}</p>
          <input type="submit" value="Login" />
        </form>
        <a onClick={toggleLoginMode}>Register an Account</a>
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
export default connect(mapStateToProps, { loginAction, toggleLoginModeAction })(Login);
