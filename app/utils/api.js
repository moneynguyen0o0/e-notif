import { request } from './request';

export const getAllVocabularies = () => {
  return request({ url: '/vocabularies' });
};

export const getDailyVocabularies = () => {
  return request({ url: '/vocabularies/daily' });
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

export const createVocabulary = (data) => {
  return request({ method: 'post', url: '/vocabularies', data });
};

export const updateVocabulary = (data) => {
  return request({ method: 'put', url: `/vocabularies/${data._id}`, data });
};

export const saveVocabulary = (data) => {
  if (data._id) {
    return updateVocabulary(data);
  }

  return createVocabulary(data);
};

export const removeVocabulary = (_id) => {
  return request({ method: 'delete', url: `/vocabularies/${_id}` });
};

export const markVocabulary = (_id) => {
  return request({ url: `/vocabularies/mark/${_id}` });
};

export const getMarkedVocabularies = () => {
  return request({ url: '/vocabularies/marked' });
};

/**
*
*
  USER
*
*
*/

export const login = (data) => {
  return request({ method: 'post', url: '/login', data });
};

export const signup = (data) => {
  return request({ method: 'post', url: '/signup', data });
};

export const logout = () => {
  return request({ url: '/logout' });
};

export const verifyMail = (token) => {
  return request({ url: `/verify-mail/${token}` });
};

export const changePassword = (data) => {
  return request({ method: 'post', url: '/change-password', data });
};

export const forgotPassword = (data) => {
  return request({ method: 'post', url: '/forgot-password', data });
};

export const resetPassword = (token, data) => {
  return request({ method: 'post', url: `/reset-password/${token}`, data });
};

export const checkToken = (token) => {
  return request({ url: `/check-token/${token}` });
};

export const getProfile = () => {
  return request({ url: '/profile' });
};

export const updateProfile = (data) => {
  return request({ method: 'post', url: '/profile/update', data });
};
