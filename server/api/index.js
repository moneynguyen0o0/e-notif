import {
  get as getUser,
  update as updateUser,
  create as createUser,
  login,
  logout,
  signup,
  verifyMail,
  changePassword,
  forgotPassword,
  resetPassword,
  checkToken } from './middlewares/User';

import {
  getAll as getAllVocabularies,
  findById as findByIdVocabulary,
  mark as markVocabulary,
  search as searchVocabularies,
  create as createVocabulary,
  update as updateVocabulary,
  remove as removeVocabulary,
  getDaily as getDailyVocabularies,
  getRandom as getRandomVocabularies,
  getMarked as getMarkedVocabularies,
  download as downloadVocabularies,
  getPOS
} from './middlewares/Vocabulary';

import {
  getAll as getAllPhrases,
  create as createPhrase,
  update as updatePhrase,
  remove as removePhrase
} from './middlewares/Phrase';

export default (router) => {
  router.post('/users', (req, res) => createUser(req, res));
  router.post('/users/login', (req, res) => login(req, res));
  router.get('/users/logout', (req, res) => logout(req, res));
  router.get('/users/verify-mail/:token', (req, res) => verifyMail(req, res));
  router.post('/users/change-password', (req, res) => changePassword(req, res));
  router.post('/users/forgot-password', (req, res) => forgotPassword(req, res));
  router.post('/users/reset-password/:token', (req, res) => resetPassword(req, res));
  router.get('/users/check-token/:token', (req, res) => checkToken(req, res));

  router.route('/users/:id')
        .get((req, res) => getUser(req, res))
        .put((req, res) => updateUser(req, res));

  router.get('/vocabularies/random', (req, res) => getRandomVocabularies(req, res));
  router.get('/vocabularies/daily', (req, res) => getDailyVocabularies(req, res));
  router.get('/vocabularies/search', (req, res) => searchVocabularies(req, res));
  router.get('/vocabularies/:id/mark', (req, res) => markVocabulary(req, res));
  router.get('/vocabularies/marked', (req, res) => getMarkedVocabularies(req, res));
  router.get('/vocabularies/pos', (req, res) => getPOS(req, res));
  router.get('/vocabularies/download', (req, res) => downloadVocabularies(req, res));

  router.route('/vocabularies')
        .get((req, res) => getAllVocabularies(req, res))
        .post((req, res) => createVocabulary(req, res));
  router.route('/vocabularies/:id')
        .get((req, res) => findByIdVocabulary(req, res))
        .put((req, res) => updateVocabulary(req, res))
        .delete((req, res) => removeVocabulary(req, res));

  router.route('/phrases')
        .get((req, res) => getAllPhrases(req, res))
        .post((req, res) => createPhrase(req, res));
  router.route('/phrases/:id')
        .put((req, res) => updatePhrase(req, res))
        .delete((req, res) => removePhrase(req, res));

  return router;
}
