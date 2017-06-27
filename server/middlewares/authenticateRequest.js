import _ from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { isAdmin } from '../utils/UserUtil';

// http://thejackalofjavascript.com/architecting-a-restful-node-js-app/

import * as URL from '../constants/URL';
import { ADMIN, USER } from '../constants/Role';

const SECURITY_CONFIG = {
  interceptUrls: [
    {
  		pattern: URL.API + URL.VOCABULARIES,
  		accesses: [ADMIN],
      method: 'GET'
  	},
    {
  		pattern: URL.API + URL.VOCABULARIES,
  		accesses: [ADMIN],
      method: 'POST'
  	},
    {
  		pattern: URL.API + URL.VOCABULARIES,
  		accesses: [ADMIN],
      method: 'DELETE'
  	}
  ]
};

export default () => {
  return (req, res, next) => {
    const { interceptUrls } = SECURITY_CONFIG;
    const { path,
      method: methodReq,
      user: { roles = [] } = {}
    } = req;

    interceptUrls.some(interceptUrl => {
      const {
        pattern,
        accesses,
        method: methodConfig = ''
      } = interceptUrl;

      if (pathToRegexp(pattern, []).test(path) && methodConfig === methodReq) {
        return !roles.find(role => _.includes(accesses, role));
      }
    }) ? res.sendStatus(401) : next();
  }
};
