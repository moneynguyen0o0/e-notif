import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  Home,
  MarkedVocabularies,
  VocabularyDetail,
  VocabularyManagement,
  About,
  Login,
  Signup,
  Profile,
  NotFoundPage,
  InternalServerErrorPage
} from './pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const { user: { authenticated, isAdmin } } = store.getState();

  const requireAdminAuth = (nextState, replace, callback) => {
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    } else if (!isAdmin) {
      replace({
        pathname: '/403',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

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
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="vocabularies/:id" component={VocabularyDetail} />
      <Route path="my-vocabularies" component={MarkedVocabularies} onEnter={requireAuth} />
      <Route path="vocabulary-management" component={VocabularyManagement} onEnter={requireAdminAuth} />
      <Route path="about" component={About} />
      <Route path="login" component={Login} onEnter={redirectAuth} />
      <Route path="signup" component={Signup} onEnter={redirectAuth} />
      <Route path="profile/:username" component={Profile} onEnter={requireAuth} />
      <Route path="500" component={InternalServerErrorPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
};
