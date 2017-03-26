process.env.NODE_ENV = 'development';

import express from 'express';
import config from './dev.config';

const app = express();

const { server: { port, options }, webpack } = config;

const compiler = require('webpack')(webpack);

app.use(require('webpack-dev-middleware')(compiler, options));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, () => {
  console.log('\x1b[34m', `WEBPACK DEV SERVER listening on PORT: ${port}`);
});
