process.env.NODE_ENV = 'development';

import express from 'express';
import logger from 'winston';
import config from './dev.config';

const app = express();

const { server: { port, options }, webpack } = config;

const compiler = require('webpack')(webpack);

app.use(require('webpack-dev-middleware')(compiler, options));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, () => {
  logger.info(`Webpack Dev Server listening on port ${port}`);
});
