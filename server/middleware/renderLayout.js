import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import { createMemoryHistory, match } from 'react-router';
import createRoutes from '../../app/routes';
import configureStore from '../../app/store/configureStore';
import { isDevelopment } from '../../config/app';

const renderHtml = (content, initialState, assets, helmet) => {
  return `
    <!DOCTYPE html>
    <html lang="em">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${assets.style.map(href => `<link href=${href} rel="stylesheet" type="text/css">`).join('\n')}
      </head>
      <body>
        <div id="content">${content}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="${assets.script[0]}"></script>
      </body>
    </html>
  `;
};

export default () => {
  return (req, res) => {
    const authenticated = req.isAuthenticated();
    const history = createMemoryHistory();
    const store = configureStore({
      user: {
        authenticated,
        isWaiting: false,
        message: '',
        isLogin: true
      }
    }, history);
    const routes = createRoutes(store);

    match({routes, location: req.url}, (err, redirect, props) => {
      if (err) {
        res.status(500).send('Internal Server Error');
      } else if (redirect) {
        res.redirect(302, redirect.pathname + redirect.search);
      } else if (props) {
        const assets = require('../webpack-stats.json');

        if (isDevelopment) {
          delete require.cache[require.resolve('../webpack-stats.json')];
        }

        const content = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        );
        const initialState = store.getState();
        const helmet = Helmet.rewind();

        console.log("======== HTML ========");
        console.log(content);

        res.status(200).send(renderHtml(content, initialState, assets, helmet));
      } else {
        res.status(404).send('Not found');
      }
    });
  }
};
