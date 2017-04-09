import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/users';
import Notification from '../Notification';

class Navigation extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  }

  render() {
    const { user, logout } = this.props;

    return (
      <nav role="navigation">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link><Notification /></Link>
        { user.authenticated ? <Link onClick={() => logout()} to="/">Logout</Link> : <div><Link to="/login">Login</Link><Link to="/signup">Signup</Link></div> }
      </nav>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, { logout })(Navigation);
