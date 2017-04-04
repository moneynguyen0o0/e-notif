import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  Page,
  Home,
  VocaDetail,
  AddVoca,
  About,
  Login,
  Profile,
  NotFoundPage
} from './pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const { user: { authenticated } } = store.getState();

  const requireAuth = (nextState, replace, callback) => {
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  return (
    <Route path="/" component={Page}>
      <IndexRoute component={Home} />
      <Route path="vocas/:id" component={VocaDetail} />
      <Route path="add-voca" component={AddVoca} />
      <Route path="about" component={About} />
      <Route path="login" component={Login} onEnter={redirectAuth} />
      <Route path="profile/:username" component={Profile} onEnter={requireAuth} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
};
