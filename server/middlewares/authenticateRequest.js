import _ from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { interceptUrls } from '../../config/security';
import { isAdmin } from '../utils/UserUtil';

export default () => {
  return (req, res, next) => {
    const {
      path,
      method: methodReq,
      user: { roles = [] } = {}
    } = req;

    interceptUrls.some(interceptUrl => {
      const { pattern, accesses, method: methodConfig = '' } = interceptUrl;

      if (pathToRegexp(pattern, []).test(path) && methodConfig === methodReq) {
        return !roles.find(role => _.includes(accesses, role));
      }
    }) ? res.sendStatus(401) : next();
  }
};
