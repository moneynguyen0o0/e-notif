import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  Home,
  SearchPage,
  MarkedVocabularies,
  VocabularyDetail,
  VocabularyManagement,
  About,
  Login,
  Signup,
  VerifyMailPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  Profile,
  NotFoundPage,
  InternalServerErrorPage
} from './pages';

const requireAdminAuth = (authenticated, isAdmin) => {
  return (nextState, replace, callback) => {
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
};

const requireAuth = (authenticated) => {
  return (nextState, replace, callback) => {
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };
};

const redirectAuth = (authenticated) => {
  return (nextState, replace, callback) => {
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
};

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const { user: { authenticated, isAdmin } } = store.getState();

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="search" component={SearchPage} />
      <Route path="vocabularies/:id" component={VocabularyDetail} />
      <Route path="my-vocabularies" component={MarkedVocabularies} onEnter={requireAuth(authenticated)} />
      <Route path="vocabulary-management" component={VocabularyManagement} onEnter={requireAdminAuth(authenticated, isAdmin)} />
      <Route path="about" component={About} />
      <Route path="login" component={Login} onEnter={redirectAuth(authenticated)} />
      <Route path="signup" component={Signup} onEnter={redirectAuth(authenticated)} />
      <Route path="verify-mail" component={VerifyMailPage} />
      <Route path="forgot-password" component={ForgotPasswordPage} />
      <Route path="reset-password" component={ResetPasswordPage} />
      <Route path="profile" component={Profile} onEnter={requireAuth(authenticated)} />
      <Route path="500" component={InternalServerErrorPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
};
