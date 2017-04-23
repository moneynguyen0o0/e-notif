import { request } from './request';

const getAllVocabularies = () => {
  return request({ url: '/vocabularies' });
};

const getDailyVocabularies = () => {
  return request({ url: '/vocabularies/daily' });
};

const findVocabulary = (_id) => {
  return request({ url: `/vocabularies/${_id}` });
};

const searchVocabularies = (params = {}) => {
  let paramString = '';

  Object.keys(params).forEach((key) => {
    if (params.length) {
      paramString += '&';
    }
    paramString += `${key}=${params[key]}`;
  });

  return request({ url: `/vocabularies/search?${paramString}` });
};

const createVocabulary = (data) => {
  return request({ method: 'post', url: '/vocabularies', data });
};

const updateVocabulary = (data) => {
  return request({ method: 'put', url: `/vocabularies/${data._id}`, data });
};

const saveVocabulary = (data) => {
  if (data._id) {
    return updateVocabulary(data);
  }

  return createVocabulary(data);
};

const removeVocabulary = (_id) => {
  return request({ method: 'delete', url: `/vocabularies/${_id}` });
};

const markVocabulary = (_id) => {
  return request({ url: `/vocabularies/mark/${_id}` });
};

const getMarkedVocabularies = () => {
  return request({ url: '/vocabularies/marked' });
};

const verifyMail = (token) => {
  return request({ url: `/verify-mail/${token}` });
};

const changePassword = (data) => {
  return request({ method: 'post', url: '/change-password', data });
};

const forgotPassword = (data) => {
  return request({ method: 'post', url: '/forgot-password', data });
};

const resetPassword = (token, data) => {
  return request({ method: 'post', url: `/reset-password/${token}`, data });
};

const checkToken = (token) => {
  return request({ url: `/check-token/${token}` });
};

const getProfile = () => {
  return request({ url: '/profile' });
};

const updateProfile = (data) => {
  return request({ method: 'put', url: `/users/${data._id}`, data });
};

export {
  getAllVocabularies,
  getDailyVocabularies,
  findVocabulary,
  searchVocabularies,
  saveVocabulary,
  createVocabulary,
  updateVocabulary,
  removeVocabulary,
  markVocabulary,
  getMarkedVocabularies,
  verifyMail,
  changePassword,
  forgotPassword,
  resetPassword,
  checkToken,
  getProfile,
  updateProfile
};
