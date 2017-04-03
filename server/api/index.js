import { getAll as getAllVocas, find as findVoca, search as searchVocas, save as saveVoca } from './middleware/Voca';
import { login, logout } from './middleware/User';

export default (router) => {
  router.get('/vocas', (req, res) => getAllVocas(res));
  router.get('/vocas/search', (req, res) => searchVocas(req, res));
  router.get('/vocas/:id', (req, res) => findVoca(req, res));
  router.post('/voca/save', (req, res) => saveVoca(req, res));

  router.post('/login', (req, res, next) => login(req, res, next));
  router.get('/logout', (req, res) => logout(req, res));

  return router;
}
