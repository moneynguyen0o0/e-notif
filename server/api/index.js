// import { Router } from 'express';
import { getVocas, saveVoca } from './middleware/Voca';
import { login, logout } from './middleware/User';

export default (router) => {
  router.get('/vocas', (req, res) => getVocas(res));
  router.post('/voca/save', (req, res) => saveVoca(req, res));

  router.post('/login', (req, res, next) => login(req, res, next));
  router.get('/logout', (req, res) => logout(req, res));

  return router;
}
