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
  return request({ url: `/verifymail/${token}` });
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
  verifyMail
};
