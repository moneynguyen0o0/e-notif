import classnames from 'classnames';
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

  state = {
    toggle: false
  }

  _toggleNav() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    const { user: { authenticated, isAdmin }, logout } = this.props;
    const { toggle } = this.state;

    const rightNav = [];

    rightNav.push(<Notification key={rightNav.length} />);

    if (authenticated) {
      if (isAdmin) {
        rightNav.push(<Link key={rightNav.length} to="/vocabulary-management">Vocabulary management</Link>);
      }

      rightNav.push(<Link key={rightNav.length} to="/my-vocabularies">My vocabularies</Link>);
      rightNav.push(<Link key={rightNav.length} onClick={() => logout()} to="/">Logout</Link>);
    } else {
      rightNav.push(<Link key={rightNav.length} to="/login">Login</Link>);
    }

    const navClassnames = classnames(
      'Navigation',
      { responsive: toggle }
    );

    return (
      <div className={navClassnames}>
        <div className="container-fluid">
          <div className="Navigation-left">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="Navigation-right">
            { rightNav }
          </div>
          <a className="icon" onClick={() => this._toggleNav()}>&#9776;</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, { logout })(Navigation);
