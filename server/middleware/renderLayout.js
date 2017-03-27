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
          var __INITIAL_STATE__ = ${JSON.stringify(initialState)}
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

    /*
     * From the react-router docs:
     *
     * This function is to be used for server-side rendering. It matches a set of routes to
     * a location, without rendering, and calls a callback(err, redirect, props)
     * when it's done.
     *
     * The function will create a `history` for you, passing additional `options` to create it.
     * These options can include `basename` to control the base name for URLs, as well as the pair
     * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
     * You can also pass in an already instantiated `history` object, which can be constructed
     * however you like.
     *
     * The three arguments to the callback function you pass to `match` are:
     * - err:       A javascript Error object if an error occurred, `undefined` otherwise.
     * - redirect:  A `Location` object if the route is a redirect, `undefined` otherwise
     * - props:     The props you should pass to the routing context if the route matched,
     *              `undefined` otherwise.
     * If all three parameters are `undefined`, this means that there was no route found matching the
     * given location.
     */
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
