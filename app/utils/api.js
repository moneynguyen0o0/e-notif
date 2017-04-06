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

const saveVocabulary = (data) => {
  return request({ method: 'post', url: '/vocabulary/save', data });
};

const updateVocabulary = (data) => {
  return request({ method: 'put', url: `/vocabularies/${data.id}`, data });
};

const deleteVocabulary = (id) => {
  return request({ method: 'delete', url: `/vocabularies/${id}` });
};

export {
  getAllVocabularies,
  findVocabulary,
  searchVocabularies,
  saveVocabulary,
  updateVocabulary,
  deleteVocabulary
};
