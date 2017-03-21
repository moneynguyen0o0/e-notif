import path from 'path';
import express from 'express';
import logger from 'winston';
import config from './config';

const app = express();
const env = process.env.NODE_ENV;

const { port } = config;

if (env === 'production') {
  app.use('/assets', express.static(path.join(__dirname, '../dist'), { maxAge: 86400000 }));
}

const stylesheetHtml = links => {
  return links.map(href => `<link href=${href} rel="stylesheet" type="text/css">`).join('\n');
};

const renderTemplate = () => {
  const assets = require('./webpack-stats.json');

  if (env === 'development') {
    delete require.cache[require.resolve('./webpack-stats.json')];
  }

  return `
    <!DOCTYPE html>
    <html lang="em">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0">
        <title>Index</title>
        ${stylesheetHtml(assets.style)}
      </head>
      <body>
        <div id="content"></div>
        <script src="${assets.script[0]}"></script>
      </body>
    </html>
  `;
}

app.get('/', (req, res) => {
  res.send(renderTemplate());
});

app.listen(port, () => {
  logger.info(`Application started on port ${port}`);
});

if (env === 'development') {
  // Tell parent process koa-server is started
  if (process.send) process.send('online');
}
