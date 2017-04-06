import { request } from './request';

const getVocabularies = () => {
  return request({ url: '/vocabularies' });
};

const findVocabulary = (id) => {
  return request({ url: `/vocabularies/${id}` });
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

const saveVocabulary = (data) => {
  return request({ method: 'post', url: '/vocabulary/save', data });
};

export {
  getVocabularies,
  findVocabulary,
  searchVocabularies,
  saveVocabulary
};
