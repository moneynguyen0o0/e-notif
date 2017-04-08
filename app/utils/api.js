import { request } from './request';

const getAllVocabularies = () => {
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

const createVocabulary = (data) => {
  return request({ method: 'post', url: '/vocabularies', data });
};

const updateVocabulary = (data) => {
  return request({ method: 'put', url: `/vocabularies/${data.id}`, data });
};

const saveVocabulary = (data) => {
  if (data.id) {
    return updateVocabulary(data);
  }

  return createVocabulary(data);
};

const removeVocabulary = (id) => {
  return request({ method: 'delete', url: `/vocabularies/${id}` });
};

export {
  getAllVocabularies,
  findVocabulary,
  searchVocabularies,
  saveVocabulary,
  createVocabulary,
  updateVocabulary,
  removeVocabulary
};
