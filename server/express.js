import path from 'path';
import express, { Router } from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import connect from './db/connect';
import api from './api';
import renderLayout from './middlewares/renderLayout';
import authentication from './middlewares/authentication';
import authenticateRequest from './middlewares/authenticateRequest';
import { PORT, ENV } from '../config/env';
import { isProduction, isDevelopment } from '../config/app';
import { sessionSecret } from '../config/secrets';
import { API } from './constants/URL';

const app = express();

connect();

authentication(passport);

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
  secret: sessionSecret
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(authenticateRequest());
app.use(API, api(Router()));

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
