import { login, logout, signup } from './middlewares/User';
import {
  getAll as getAllVocabularies,
  findById as findByIdVocabulary,
  mark as markVocabulary,
  search as searchVocabularies,
  create as createVocabulary,
  update as updateVocabulary,
  remove as deleteVocabulary,
  getMarked as getMarkedVocabularies
} from './middlewares/Vocabulary';

export default (router) => {
  router.post('/login', (req, res) => login(req, res));
  router.get('/logout', (req, res) => logout(req, res));
  router.post('/signup', (req, res) => signup(req, res));

  router.get('/vocabularies/search', (req, res) => searchVocabularies(req, res));
  router.get('/vocabularies/mark/:id', (req, res) => markVocabulary(req, res));
  router.get('/vocabularies/marked', (req, res) => getMarkedVocabularies(req, res));
  router.route('/vocabularies')
        .get((req, res) => getAllVocabularies(res))
        .post((req, res) => createVocabulary(req, res));
  router.route('/vocabularies/:id')
        .get((req, res) => findByIdVocabulary(req, res))
        .put((req, res) => updateVocabulary(req, res))
        .delete((req, res) => deleteVocabulary(req, res));

  return router;
}
