import _ from 'lodash';
import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { isAdmin } from '../../utils/UserUtil';
import { logout } from '../../actions/users';
import { searchAutocompleteVocabularies } from '../../utils/API';
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

    const linkProps = {
      className: 'menu-item',
      onClick: () => this._toggleNav()
    };

    const rightNav = [];

    rightNav.push(<a key={rightNav.length} className="menu-item notification"><Notification /></a>);
    rightNav.push(<Link key={rightNav.length} to="/quiz" {...linkProps}>Quiz</Link>);

    if (authenticated) {
      const userId = user._id;

      if (isAdmin(user)) {
        rightNav.push(<Link key={rightNav.length} to="/manage/vocabularies" {...linkProps}>Manage vocabularies</Link>);
      }

      rightNav.push(<Link key={rightNav.length} to={`/profile/${userId}/vocabularies`} {...linkProps}>My vocabularies</Link>);
      rightNav.push(<Link key={rightNav.length} to="/manage/phrases" {...linkProps}>My phrases</Link>);
      rightNav.push(<Link key={rightNav.length} to={`/profile/${userId}`} {...linkProps}>Profile</Link>);
      rightNav.push(<Link key={rightNav.length} onClick={() => logout()} to="/" {...linkProps}>Logout</Link>);
    } else {
      rightNav.push(<Link key={rightNav.length} to="/login" {...linkProps}>Login</Link>);
    }

    const navClassnames = classnames(
      'Header',
      { responsive: toggle }
    );

    return (
      <div className={navClassnames}>
        <div className="container-fluid">
          <Link to="/"><div className="Header-logo" /></Link>
          <div className="Header-search">
            <SearchBar />
          </div>
          <div className="Header-left">
            <Link to="/" {...linkProps}>Home</Link>
            <Link to="/about" {...linkProps}>About</Link>
          </div>
          <div className="Header-right">
            { rightNav }
          </div>
          <a {...linkProps} className="menu-item icon">&#9776;</a>
        </div>
      </div>
    );
  }
}

class SearchBar extends Component {
  state = {
    keyword: '',
    vocabularies: []
  }

  componentWillMount() {
    this._searchAutoComplete = _.debounce(this._searchAutoComplete, 500, { maxWait: 500, leading: true });
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
    const value = event.target.value;

    this._searchAutoComplete(value);

    this.setState({ keyword: value });
  }

  _searchAutoComplete(keyword) {
    if (keyword.length > 1) {
      searchAutocompleteVocabularies({ keyword }).then(vocabularies => {
        this.setState({ vocabularies });
      });
    }

    this.setState({ vocabularies: [] });
  }

  render() {
    const { keyword, vocabularies } = this.state;

    return (
      <div className="Search">
        <div className="SearchBar">
          <input type="search" placeholder="Search..." value={keyword} onChange={(e) => this._handleChange(e)} onKeyPress={(e) => this._handleKeyPress(e)} />
          <button className="icon" onClick={() => this._search()}><i className="fa fa-search" /></button>
        </div>
        {
          vocabularies.length > 0 && <div className="SearchResult">
            <ul>
              {
                vocabularies.map((vocabulary, index) => {
                  const { _id, word } = vocabulary;

                  return <a key={index} href={`/vocabularies/${_id}`}><li>{word}</li></a>;
                })
              }
            </ul>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, { logout })(Header);
