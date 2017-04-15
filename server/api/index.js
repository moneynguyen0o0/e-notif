import { login, logout, signup } from './middlewares/User';
import {
  getAll as getAllVocabularies,
  findById as findByIdVocabulary,
  search as searchVocabularies,
  create as createVocabulary,
  update as updateVocabulary,
  remove as deleteVocabulary
} from './middlewares/Vocabulary';

export default (router) => {
  router.post('/login', (req, res) => login(req, res));
  router.get('/logout', (req, res) => logout(req, res));
  router.post('/signup', (req, res) => signup(req, res));

  router.get('/vocabularies/search', (req, res) => searchVocabularies(req, res));
  router.route('/vocabularies')
        .get((req, res) => getAllVocabularies(res))
        .post((req, res) => createVocabulary(req, res));
  router.route('/vocabularies/:id')
        .get((req, res) => findByIdVocabulary(req, res))
        .put((req, res) => updateVocabulary(req, res))
        .delete((req, res) => deleteVocabulary(req, res));

  return router;
}
