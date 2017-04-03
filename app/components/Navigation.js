import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut as logOutAction } from '../actions/users';
import Notif from '../components/Notif';

class Navigation extends Component {
  static propTypes = {
    user: PropTypes.object,
    logOut: PropTypes.func.isRequired
  }

  render() {
    const { user, logOut } = this.props;

    return (
      <nav role="navigation">
        <Link to="/">Home</Link>
        <Link to="/add-voca">Add voca</Link>
        <Link to="/about">About</Link>
        <Link><Notif /></Link>
        { user.authenticated ? <Link onClick={() => logOut()} to="/">Logout</Link> : <Link to="/login">Login</Link> }
      </nav>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, { logOut: logOutAction })(Navigation);
