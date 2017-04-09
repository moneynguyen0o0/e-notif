import passport from 'passport';

/**
 * POST /login
 */
export const login = (req, res, next) => {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.json({ status: 401, message: 'Email or Password is invalid.' });
    }
    // Passport exposes a login() const on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      return res.json({ status: 200, message: 'You have been successfully logged in.' });
    });
  })(req, res, next);
};

/**
 * POST /logout
 */
export const logout = (req, res) => {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
};

/**
 * POST /signup
 * Create a new local account
 */
export const signup = (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password
  } = req.body;

  const user = {
    firstname,
    lastname,
    email,
    password
  };

  const tdb = require('../../../data/tdb.json');
  const accounts = tdb.accounts;

  if (accounts.find(account => account.email === email)) {
    return res.json({ status: 409, message: 'Account with this email address already exists!' });
  }

  tdb.accounts.push(user);

  const dbPath = process.cwd() + '/data/tdb.json';

  const fs = require('fs');
  fs.unlinkSync(dbPath);
  fs.writeFileSync(dbPath, JSON.stringify(tdb, null, 2));

  return req.logIn(user, (loginErr) => {
    if (loginErr) return next(loginErr);
    return res.json({ status: 200, message: 'You have been successfully logged in.' });
  });
}
