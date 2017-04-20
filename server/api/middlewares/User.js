import passport from 'passport';
import User from '../../services/User';

export const login = (req, res) => {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user) => {
    if (authErr) return res.status(500).send({ message: 'Authenticated error', error: err })
    if (!user) return res.status(401).json({ message: 'Email or Password is invalid.' });
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

  const newUser = {
    firstname,
    lastname,
    email,
    password
  };

  User.findByEmail(email, (err, user) => {
    if (err) return res.status(500).send({ message: 'Something went wrong getting the data', error: err });
    if (user) return res.status(409).json({ message: 'Account with this email address already exists!' });

    User.create(newUser, (err, user) => {
      if (err) return res.status(500).send({ message: 'Something went wrong creating the data', error: err });

      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.status(500).send({ message: 'Authenticated error', error: err });
        return res.sendStatus(200);
      });
    });
  });
};

export const sendEmail = (req, res) => {
  console.log("===================");
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'trungnguyen1793@gmail.com',
        pass: 'hoangtrung123'
      }
  });

  const mailOptions = {
    from: 'trungnguyen1793@gmail.com',
    to: 'moneynguyen0o0@gmail.com',
    subject: 'Test Enotif',
    html: '<b>Hello world ✔</b>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.json({yo: 'error'});
    } else {
      console.log('Message sent: ' + info.response);
      res.json({yo: info.response});
    };
  });
};
