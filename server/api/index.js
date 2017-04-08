import { login, logout } from './middleware/User';
import {
  getAll as getAllVocabularies,
  find as findVocabulary,
  search as searchVocabularies,
  save as saveVocabulary,
  update as updateVocabulary,
  remove as deleteVocabulary
} from './middleware/Vocabulary';

export default (router) => {
  router.post('/login', (req, res, next) => login(req, res, next));
  router.get('/logout', (req, res) => logout(req, res));

  router.get('/vocabularies/search', (req, res) => searchVocabularies(req, res));
  router.route('/vocabularies')
        .get((req, res) => getAllVocabularies(res))
        .post((req, res) => saveVocabulary(req, res));
  router.route('/vocabularies/:id')
        .get((req, res) => findVocabulary(req, res))
        .put((req, res) => updateVocabulary(req, res))
        .delete((req, res) => deleteVocabulary(req, res));

  return router;
}
