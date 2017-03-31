// import { Router } from 'express';
import { getData } from './middleware/Data';
import { login, logout } from './middleware/User';

export default (router) => {
  router.get('/data', (req, res) => getData(res));
  router.post('/login', (req, res, next) => login(req, res, next));
  router.post('/logout', (req, res) => login(req, res));

  return router;
}
