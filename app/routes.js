import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Page, Home, About, Login, Profile, NotFoundPage } from './pages';

const requireAuth = (nextState, replace, callback) => {
  const { params: { username } } = nextState;

  if (username !== 'money') {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }

  callback();
};

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  // const { user: { authenticated } } = store.getState();
  // console.log('authenticated: ' + authenticated);

  return (
    <Route path="/" component={Page}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About} />
      <Route path="login" component={Login} />
      <Route path="profile/:username" component={Profile} onEnter={requireAuth}/>
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
};
