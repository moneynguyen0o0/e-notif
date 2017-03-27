import path from 'path';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import renderLayout from './middleware/renderLayout';
import { PORT, ENV } from '../config/env';
import { isProduction, isDevelopment } from '../config/app';
import { sessionSecret } from '../config/secrets';

const app = express();

if (isProduction) {
  app.use(compression());
  app.use(helmet());
}

app.use(favicon(path.join(__dirname, '..', 'app', 'images', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

if (isProduction) {
  app.use('/assets', express.static(path.join(__dirname, '..', 'dist'), { maxAge: 86400000 }));
}

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: sessionSecret,
  proxy: true, // The "X-Forwarded-Proto" header will be used.
  name: 'sessionId',
  // Add HTTPOnly, Secure attributes on Session Cookie
  // If secure is set, and you access your site over HTTP, the cookie will not be set
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(renderLayout());

app.listen(PORT, () => {
  console.log('------------------------------------');
  console.log('===> 😎  Starting Server . . .');
  console.log(`===>  Environment: ${ENV}`);
  console.log(`===>  Listening on port: ${PORT}`);
  console.log('------------------------------------');
});

if (isDevelopment) {
  // Tell parent process koa-server is started
  if (process.send) process.send('online');
}
