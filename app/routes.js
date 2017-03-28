import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Page, Home, About, NotFoundPage } from './pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  return (
    <Route path="/" component={Page}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
};
