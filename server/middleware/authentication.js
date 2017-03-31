import passport from 'passport';
import { Strategy } from 'passport-local';

const user = {
  email: 'money@gmail.com',
  password: 'money'
};

const findByEmail = (email, done) => {
  if (email === user.email) {
    return done(null, user)
  }
  return done(null)
};

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

  passport.deserializeUser((email, done) => {
    findByEmail(email, (err, user) => {
      if (err) { return done(err); }
      done(null, user);
    });
  });

  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`email` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `done` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(new Strategy({
    usernameField: 'email'
  }, (email, password, done) => {
    findByEmail(email, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
  }));
};
