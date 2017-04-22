import _ from 'lodash';
import passport from 'passport';
import User from '../models/User';

const findByEmail = (email, done) => {
  User.findOne({ email }, (err, user) => {
    done(err, user);
  });
};

const authenticate = (email, password, done) => {
  User.findOne({ email }, (findErr, user) => {
    if (!user) return done(null, false, { message: `There is no record of the email ${email}.` });
    return user.comparePassword(password, (err, isMatch) => {
      if (isMatch) {
        return done(null, user);
      }

      return done(null, false, { message: 'Your email or password combination is not correct.' });
    });
  });
};

const create = (user, done) => {
  User.create(user, (err, user) => {
    done(err, user);
  });
};

const update = (user, done) => {
  const { _id } = user;

  User.findOneAndUpdate({ _id }, _.omit(user, ['_id', '__v']), { new: true }, (err, user) => {
    done(err, user);
  });
};

const findByToken = (token, done) => {
  User.findOne({ token }, (err, user) => {
    done(err, user);
  });
};

export default {
  findByEmail,
  authenticate,
  create,
  update,
  findByToken
};
