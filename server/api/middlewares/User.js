import passport from 'passport';
import uuidV4 from 'uuid/v4';
import User from '../../services/User';
import { sendMail } from '../../utils/MailUtil';

const getRootUrl = (req) => {
  return req.protocol + '://' + req.get('host');
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

      return res.sendStatus(200);
    });
  })(req, res);
};

export const logout = (req, res) => {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
};

export const signup = (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password
  } = req.body;

  const token = uuidV4();

  const newUser = {
    first_name: firstname,
    last_name: lastname,
    email,
    password,
    token
  };

  User.findByEmail(email, (err, user) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });
    if (user) return res.status(409).json({ message: 'Account with this email address already exists!' });

    User.create(newUser, (err, user) => {
      if (err) return res.status(500).send({ message: 'Something went wrong creating the data', error: err });

      const url = getRootUrl(req) + '/verify-mail?token=' + token;
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
