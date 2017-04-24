import { login, logout, signup, verifyMail, changePassword, forgotPassword, resetPassword, checkToken, getProfile, updateProfile } from './middlewares/User';
import {
  getAll as getAllVocabularies,
  findById as findByIdVocabulary,
  mark as markVocabulary,
  search as searchVocabularies,
  create as createVocabulary,
  update as updateVocabulary,
  remove as deleteVocabulary,
  getDaily as getDailyVocabularies,
  getMarked as getMarkedVocabularies
} from './middlewares/Vocabulary';

export default (router) => {
  router.post('/login', (req, res) => login(req, res));
  router.get('/logout', (req, res) => logout(req, res));
  router.post('/signup', (req, res) => signup(req, res));
  router.get('/verify-mail/:token', (req, res) => verifyMail(req, res));
  router.post('/change-password', (req, res) => changePassword(req, res));
  router.post('/forgot-password', (req, res) => forgotPassword(req, res));
  router.post('/reset-password/:token', (req, res) => resetPassword(req, res));
  router.get('/check-token/:token', (req, res) => checkToken(req, res));
  router.get('/profile', (req, res) => getProfile(req, res));
  router.post('/profile/update', (req, res) => updateProfile(req, res));

  router.get('/vocabularies/daily', (req, res) => getDailyVocabularies(req, res));
  router.get('/vocabularies/search', (req, res) => searchVocabularies(req, res));
  router.get('/vocabularies/mark/:id', (req, res) => markVocabulary(req, res));
  router.get('/vocabularies/marked', (req, res) => getMarkedVocabularies(req, res));
  router.route('/vocabularies')
        .get((req, res) => getAllVocabularies(req, res))
        .post((req, res) => createVocabulary(req, res));
  router.route('/vocabularies/:id')
        .get((req, res) => findByIdVocabulary(req, res))
        .put((req, res) => updateVocabulary(req, res))
        .delete((req, res) => deleteVocabulary(req, res));

  return router;
}
