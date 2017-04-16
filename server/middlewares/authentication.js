import passport from 'passport';
import { Strategy } from 'passport-local';
import { findByEmail, authenticate } from '../services/User';

export default (passport) => {
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(findByEmail);

  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`email` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `done` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(new Strategy({
    usernameField: 'email'
  }, authenticate));
};
