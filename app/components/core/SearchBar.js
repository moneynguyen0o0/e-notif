import React, { Component, PropTypes } from 'react';

// https://webdesign.tutsplus.com/tutorials/css-experiments-with-a-search-form-input-and-button--cms-22069
export default class SearchBar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    keyword: ''
  }

  _search() {
    const { keyword } = this.state;
    if (keyword) {
      this.context.router.push(`/search?keyword=${keyword}`);
    }
  }

  _handleChange(event) {
    this.setState({ keyword: event.target.value });
  }

  render() {
    const { keyword } = this.state;

    return (
      <div className="SearchBar">
        <div className="SearchBar-container">
          <div className="SearchBar-box">
            <input type="search" placeholder="Search..." value={keyword} onChange={(e) => this._handleChange(e)} />
            <button className="icon" onClick={() => this._search()}><i className="fa fa-search" /></button>
          </div>
        </div>
      </div>
    );
  }
}
