import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { isAdmin } from '../../utils/UserUtil';
import { logout } from '../../actions/users';
import Notification from '../media/Notification';

class Header extends Component {
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
    const { user: { authenticated, data: user }, logout } = this.props;
    const { toggle } = this.state;

    const rightNav = [];

    rightNav.push(<a key={rightNav.length} className="notification"><Notification /></a>);

    if (authenticated) {
      const userId = user._id;

      if (isAdmin(user)) {
        rightNav.push(<Link key={rightNav.length} to="/manage/vocabularies">Manage vocabularies</Link>);
      }

      rightNav.push(<Link key={rightNav.length} to={`/profile/${userId}/vocabularies`}>My vocabularies</Link>);
      rightNav.push(<Link key={rightNav.length} to={`/profile/${userId}`}>Profile</Link>);
      rightNav.push(<Link key={rightNav.length} onClick={() => logout()} to="/">Logout</Link>);
    } else {
      rightNav.push(<Link key={rightNav.length} to="/login">Login</Link>);
    }

    const navClassnames = classnames(
      'Header',
      { responsive: toggle }
    );

    return (
      <div className={navClassnames}>
        <div className="container-fluid">
          <div className="Header-logo" />
          <div className="Header-search">
            <SearchBar />
          </div>
          <div className="Header-left">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="Header-right">
            { rightNav }
          </div>
          <a className="icon" onClick={() => this._toggleNav()}>&#9776;</a>
        </div>
      </div>
    );
  }
}

class SearchBar extends Component {
  state = {
    keyword: ''
  }

  _search() {
    const { keyword } = this.state;
    if (keyword) {
      browserHistory.push({
        pathname: '/search',
        query: {
          keyword
        }
      });
    }
  }

  _handleKeyPress(e) {
    if (e.charCode === 13) {
      this._search();
    }
  }

  _handleChange(event) {
    this.setState({ keyword: event.target.value });
  }

  render() {
    const { keyword } = this.state;

    return (
      <div className="SearchBar">
        <input type="search" placeholder="Search..." value={keyword} onChange={(e) => this._handleChange(e)} onKeyPress={(e) => this._handleKeyPress(e)} />
        <button className="icon" onClick={() => this._search()}><i className="fa fa-search" /></button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, { logout })(Header);
