import { request } from './request';

export const getVocas = () => {
  return request({ url: '/vocabularies' });
};

export const findVoca = (id) => {
  return request({ url: `/vocabularies/${id}` });
};

export const searchVocas = (params) => {
  let paramString = '';

  Object.keys(params).forEach((key) => {
    if (params.length) {
      paramString += '&';
    }
    paramString += `${key}=${params[key]}`;
  });

  return request({ url: `/vocabularies/search?${paramString}` });
};

export const saveVoca = (data) => {
  return request({ method: 'post', url: '/vocabulary/save', data });
};
