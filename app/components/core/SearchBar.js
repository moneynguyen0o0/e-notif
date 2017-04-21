import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class SearchBar extends Component {
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
        <div className="SearchBar-box">
          <input type="search" placeholder="Search..." value={keyword} onChange={(e) => this._handleChange(e)} onKeyPress={(e) => this._handleKeyPress(e)} />
          <button className="icon" onClick={() => this._search()}><i className="fa fa-search" /></button>
        </div>
      </div>
    );
  }
}
