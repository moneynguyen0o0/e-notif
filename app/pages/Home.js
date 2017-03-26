import React, { Component } from 'react';
import Page from '../components/Page';

class Home extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Home | ENotif';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Home Page' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    console.log("OHHH");
    return (
      <Page {...this.getMetaData()}>
        <h1>Helloooooo</h1>
      </Page>
    );
  }
}

export default Home;
