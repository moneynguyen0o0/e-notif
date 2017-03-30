import passport from 'passport';

/**
 * POST /login
 */
export const login = (req, res) => {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    // Passport exposes a login() const on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(401).json({ message: loginErr });
      return res.status(200).json({
        message: 'You have been successfully logged in.'
      });
    });
  })(req, res);
}

/**
 * POST /logout
 */
export const logout(req, res) {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
}
