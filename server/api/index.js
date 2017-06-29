import * as URL from '../constants/URL';
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
  searchFuzzy as searchFuzzyVocabularies,
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
  getAllByUser as getAllPhrasesByUser,
  create as createPhrase,
  updateByUser as updatePhraseByUser,
  removeByUser as removePhraseByUser
} from './middlewares/Phrase';

export default (router) => {
  router.post(URL.USER, (req, res) => createUser(req, res));
  router.post(URL.USER_LOGIN, (req, res) => login(req, res));
  router.get(URL.USER_LOGOUT, (req, res) => logout(req, res));
  router.get(URL.USER_VERIFY_MAIL, (req, res) => verifyMail(req, res));
  router.post(URL.USER_PASSWORD_CHANGE, (req, res) => changePassword(req, res));
  router.post(URL.USER_PASSWORD_FORGOT, (req, res) => forgotPassword(req, res));
  router.post(URL.USER_PASSWORD_RESET, (req, res) => resetPassword(req, res));
  router.get(URL.USER_CHECK_TOKEN, (req, res) => checkToken(req, res));

  router.route(URL.USER_ID)
        .get((req, res) => getUser(req, res))
        .put((req, res) => updateUser(req, res));

  router.get(URL.VOCABULARIES_RANDOM, (req, res) => getRandomVocabularies(req, res));
  router.get(URL.VOCABULARIES_DAILY, (req, res) => getDailyVocabularies(req, res));
  router.get(URL.VOCABULARIES_SEARCH, (req, res) => searchVocabularies(req, res));
  router.get(URL.VOCABULARIES_SEARCH_AUTOCOMPLETE, (req, res) => searchFuzzyVocabularies(req, res));
  router.get(URL.VOCABULARIES_ID_MARK, (req, res) => markVocabulary(req, res));
  router.get(URL.VOCABULARIES_MARKED, (req, res) => getMarkedVocabularies(req, res));
  router.get(URL.VOCABULARIES_POS, (req, res) => getPOS(req, res));
  router.get(URL.VOCABULARIES_DOWNLOAD, (req, res) => downloadVocabularies(req, res));

  router.route(URL.VOCABULARIES)
        .get((req, res) => getAllVocabularies(req, res))
        .post((req, res) => createVocabulary(req, res));
  router.route(URL.VOCABULARIES_ID)
        .get((req, res) => findByIdVocabulary(req, res))
        .put((req, res) => updateVocabulary(req, res))
        .delete((req, res) => removeVocabulary(req, res));

  router.route(URL.PHRASES)
        .get((req, res) => getAllPhrasesByUser(req, res))
        .post((req, res) => createPhrase(req, res));
  router.route(URL.PHRASES_ID)
        .put((req, res) => updatePhraseByUser(req, res))
        .delete((req, res) => removePhraseByUser(req, res));

  return router;
}
