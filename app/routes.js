import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { isAdmin } from './utils/UserUtil';
import {
  App,
  Home,
  Search,
  MyVocabularies,
  Vocabulary,
  ManageVocabularies,
  ManagePhrases,
  About,
  Login,
  Signup,
  VerifyMail,
  ForgotPassword,
  ResetPassword,
  Profile,
  Quiz,
  NotFound,
  InternalServerError,
  AccessDenied
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
        pathname: '/access-denied',
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
  const { user: { authenticated, data: user } } = store.getState();

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="search" component={Search} />
      <Route path="vocabularies/:id" component={Vocabulary} />
      <Route path="profile/:id/vocabularies" component={MyVocabularies} onEnter={requireAuth(authenticated)} />
      <Route path="manage/phrases" component={ManagePhrases} onEnter={requireAuth(authenticated)} />
      <Route path="manage/vocabularies" component={ManageVocabularies} onEnter={requireAdminAuth(authenticated, isAdmin(user))} />
      <Route path="about" component={About} />
      <Route path="login" component={Login} onEnter={redirectAuth(authenticated)} />
      <Route path="signup" component={Signup} onEnter={redirectAuth(authenticated)} />
      <Route path="users/verify-mail" component={VerifyMail} />
      <Route path="users/forgot-password" component={ForgotPassword} />
      <Route path="users/reset-password" component={ResetPassword} />
      <Route path="profile/:id" component={Profile} onEnter={requireAuth(authenticated)} />
      <Route path="quiz" component={Quiz} />
      <Route path="internal-server-error" component={InternalServerError} />
      <Route path="access-denied" component={AccessDenied} />
      <Route path="*" component={NotFound} />
    </Route>
  );
};
