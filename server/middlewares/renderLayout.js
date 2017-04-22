import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import { createMemoryHistory, match } from 'react-router';
import createRoutes from '../../app/routes';
import configureStore from '../../app/store/configureStore';
import { isDevelopment } from '../../config/app';
import { isAdmin } from '../utils/UserUtil';

const renderHtml = (content, initialState, assets, helmet) => {
  return `
    <!DOCTYPE html>
    <html lang="em">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0">
        <link rel="shortcut icon" href="/favicon.ico">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        ${assets.style.map(href => `<link href=${href} rel="stylesheet" type="text/css">`).join('\n')}
        <script src="https://code.jquery.com/jquery-3.2.0.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
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
    const { user = {} } = req;
    const history = createMemoryHistory();
    const store = configureStore({
      user: {
        _id: user._id || '',
        isAdmin: isAdmin(user),
        authenticated
      }
    }, history);
    const routes = createRoutes(store);

    match({routes, location: req.url}, (err, redirect, props) => {
      if (err) {
        res.sendStatus(500);
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

        res.send(renderHtml(content, initialState, assets, helmet));
      } else {
        res.sendStatus(404);
      }
    });
  }
};
