import React, { Component } from 'react';
import Page from '../components/Page';

class About extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'About | ENotif';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'About Page' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <h1>About</h1>
      </Page>
    );
  }
}

export default About;
