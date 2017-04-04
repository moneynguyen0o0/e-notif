import { getAll as getAllVocas, find as findVoca, search as searchVocas, save as saveVoca } from './middleware/Vocabulary';
import { login, logout } from './middleware/User';

export default (router) => {
  router.get('/vocabularies', (req, res) => getAllVocas(res));
  router.get('/vocabularies/search', (req, res) => searchVocas(req, res));
  router.get('/vocabularies/:id', (req, res) => findVoca(req, res));
  router.post('/vocabulary/save', (req, res) => saveVoca(req, res));

  router.post('/login', (req, res, next) => login(req, res, next));
  router.get('/logout', (req, res) => logout(req, res));

  return router;
}
