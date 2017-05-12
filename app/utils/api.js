import { request } from './request';

/**
*
*
  VOCABULARY
*
*
*/

export const getAllVocabularies = () => {
  return request({ url: '/vocabularies' });
};

export const getDailyVocabularies = () => {
  return request({ url: '/vocabularies/daily' });
};

export const getRandomVocabularies = () => {
  return request({ url: '/vocabularies/random' });
};

export const findVocabulary = (_id) => {
  return request({ url: `/vocabularies/${_id}` });
};

export const searchVocabularies = (params = {}) => {
  let paramString = '';

  Object.keys(params).forEach((key) => {
    if (params.length) {
      paramString += '&';
    }
    paramString += `${key}=${params[key]}`;
  });

  return request({ url: `/vocabularies/search?${paramString}` });
};

export const getPOS = () => {
  return request({ url: '/vocabularies/pos' });
};

export const createVocabulary = (vocabulary) => {
  return request({ method: 'post', url: '/vocabularies', data: { vocabulary } });
};

export const updateVocabulary = (vocabulary) => {
  return request({ method: 'put', url: `/vocabularies/${vocabulary._id}`, data: { vocabulary } });
};

export const saveVocabulary = (vocabulary) => {
  if (vocabulary._id) {
    return updateVocabulary(vocabulary);
  }

  return createVocabulary(vocabulary);
};

export const removeVocabulary = (_id) => {
  return request({ method: 'delete', url: `/vocabularies/${_id}` });
};

export const markVocabulary = (_id) => {
  return request({ url: `/vocabularies/${_id}/mark` });
};

export const getMarkedVocabularies = () => {
  return request({ url: '/vocabularies/marked' });
};

/**
*
*
  PHRASE
*
*
*/

export const getAllPharses = () => {
  return request({ url: '/pharses' });
};

export const createPharse = (pharse) => {
  return request({ method: 'post', url: '/pharses', data: { pharse } });
};

export const updatePharse = (pharse) => {
  return request({ method: 'put', url: `/pharses/${vocabulary._id}`, data: { pharse } });
};

export const savePharse = (pharse) => {
  if (pharse._id) {
    return updateVocabulary(pharse);
  }

  return createVocabulary(pharse);
};

export const removePharse = (_id) => {
  return request({ method: 'delete', url: `/pharses/${_id}` });
};

/**
*
*
  USER
*
*
*/

export const login = (user) => {
  return request({ method: 'post', url: '/users/login', data: user });
};

export const signup = (user) => {
  return request({ method: 'post', url: '/users', data: { user } });
};

export const logout = () => {
  return request({ url: '/users/logout' });
};

export const verifyMail = (token) => {
  return request({ url: `/users/verify-mail/${token}` });
};

export const changePassword = (data) => {
  return request({ method: 'post', url: '/users/change-password', data });
};

export const forgotPassword = (data) => {
  return request({ method: 'post', url: '/users/forgot-password', data });
};

export const resetPassword = (token, data) => {
  return request({ method: 'post', url: `/users/reset-password/${token}`, data });
};

export const checkToken = (token) => {
  return request({ url: `/users/check-token/${token}` });
};

export const getProfile = (id) => {
  return request({ url: `/users/${id}` });
};

export const updateProfile = (user) => {
  return request({ method: 'put', url: `/users/${user._id}`, data: { user } });
};
