import _ from 'lodash';
import passport from 'passport';
import uuidV4 from 'uuid/v4';
import moment from 'moment';
import User from '../../services/User';
import { sendMail } from '../../utils/MailUtil';
import { pickUser } from '../../utils/UserUtil';

const AGE = 15 * 24 * 60 * 60 * 1000;

const getRootUrl = (req) => {
  return req.protocol + '://' + req.get('host');
};

export const create = (req, res) => {
  const {
    user: userData = {}
  } = req.body;

  const { email } = userData;

  User.findByEmail(email, (err, user) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });
    if (user) return res.status(409).json({ message: 'Account with this email address already exists!' });

    const token = uuidV4();

    const newUser = _.pick(userData, ['firstname', 'lastname', 'email', 'password']);
    newUser.token = token;

    User.create(newUser, (err, user) => {
      if (err) return res.status(500).send({ message: 'Something went wrong creating the data', error: err });

      const url = getRootUrl(req) + '/users/verify-mail?token=' + token;
      const content = `
        <a href="${url}">Verify</a>
      `;

      sendMail({ email, subject: 'Enotif - Verify your mail', content }).then(() => {
        return res.sendStatus(200);
      }).catch(err => {
        return res.status(500).send({ message: 'Send mail error', error: err });
      });
    });
  });
};

export const get = (req, res) => {
  const { user: { _id } = {} } = req;

  User.findById(_id, (err, user) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    return res.json(pickUser(user));
  });
};

export const update = (req, res) => {
  const {
    body: {
      user: userData = {}
    },
    user: { _id } = {}
  } = req;

  User.findById(_id, (err, user) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    User.update({ _id, ..._.pick(userData, ['firstname', 'lastname', 'dob', 'gender']) }, (err, user) => {
      if (err) return res.status(500).send({ message: 'Something went wrong updating the data', error: err });

      return res.json(pickUser(user));
    });
  });
};

export const login = (req, res) => {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user) => {
    if (authErr) return res.status(500).send({ message: 'Authenticated error', error: err })
    if (!user) return res.status(401).json({ message: 'Email or Password is invalid.' });
    if (!user.enable) return res.status(401).json({ message: 'Account is not active.' });
    // Passport exposes a login() const on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(500).send({ message: 'Authenticated error', error: err });

      if (req.body.remember) {
        req.session.cookie.expires = new Date(Date.now() + AGE);
        req.session.cookie.maxAge = AGE;
      } else {
        req.session.cookie.expires = false;
      }

      return res.sendStatus(200);
    });
  })(req, res);
};

export const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};

export const verifyMail = (req, res) => {
  const { params: { token } } = req;

  User.findByToken(token, (err, user) => {
    if (!user) return res.status(404).send({ message: 'Data not found', error: err });

    const { _id } = user;

    User.update({ _id, token: '', enable: true }, (err) => {
      if (err) return res.status(500).send({ message: 'Something went wrong updating the data', error: err });

      return res.sendStatus(200);
    });
  });
};

export const changePassword = (req, res) => {
  const {
    body: {
      currentPassword,
      newPassword
    },
    user: { _id } = {}
  } = req;

  User.findById(_id, (err, user) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });

    user.comparePassword(currentPassword, (err, isMatch) => {
      if (!isMatch) {
        return res.sendStatus(401);
      }

      user.password = newPassword;

      user.save((err) => {
        if (err) return res.status(500).send({ message: 'Something went wrong updating the data', error: err });

        return res.sendStatus(200);
      });
    });
  });
};

export const forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findByEmail(email, (err, user) => {
    if (!user) return res.status(404).send({ message: 'Mail not found', error: err });

    const { _id, resetPasswordExpires } = user;
    const token = uuidV4();

    if (resetPasswordExpires && resetPasswordExpires.getTime() > (new Date()).getTime()) {
      return res.status(498).send({ message: 'Can not handle now', error: err });
    }

    User.update({ _id, token, resetPasswordExpires: moment(moment()).add(1, 'day') }, (err) => {
      if (err) return res.status(500).send({ message: 'Something went wrong updating the data', error: err });

      const url = getRootUrl(req) + '/users/reset-password?token=' + token;
      const content = `
        <a href="${url}">Reset</a>
      `;

      sendMail({ email, subject: 'Enotif - Reset password', content }).then(() => {
        return res.sendStatus(200);
      }).catch(err => {
        return res.status(500).send({ message: 'Send mail error', error: err });
      });
    });
  });
};

export const resetPassword = (req, res) => {
  const { body: { newPassword },  params: { token } } = req;

  User.findByToken(token, (err, user) => {
    if (!user) return res.status(404).send({ message: 'Data not found', error: err });

    const { resetPasswordExpires } = user;

    if (resetPasswordExpires && (new Date()).getTime() > resetPasswordExpires.getTime()) {
      return res.status(498).send({ message: 'Too late to handle', error: err });
    }

    user.password = newPassword;
    user.token = '';

    user.save((err) => {
      if (err) return res.status(500).send({ message: 'Something went wrong updating the data', error: err });

      return res.sendStatus(200);
    });
  });
};

export const checkToken = (req, res) => {
  const { params: { token } } = req;

  User.findByToken(token, (err, user) => {
    if (!user) return res.status(404).send({ message: 'Data not found', error: err });

    const { resetPasswordExpires } = user;

    if (resetPasswordExpires && (new Date()).getTime() > resetPasswordExpires.getTime()) {
      return res.status(498).send({ message: 'Too late to handle', error: err });
    }

    return res.sendStatus(200);
  });
};
