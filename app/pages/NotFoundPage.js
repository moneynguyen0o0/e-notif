import React, { Component } from 'react';
import Page from '../components/Page';

class NotFoundPage extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Page Not Found | ENotif';
  }

  pageMeta() {
    return [];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <h1>404 - Page Not Found</h1>
      </Page>
    );
  }
}

export default NotFoundPage;
