import { request } from './request';

export const getVocas = () => {
  return request({ url: '/vocas' });
};

export const findVoca = (id) => {
  return request({ url: `/vocas/${id}` });
};

export const searchVocas = (params) => {
  let paramString = '';

  Object.keys(params).forEach((key) => {
    if (params.length) {
      paramString += '&';
    }
    paramString += `${key}=${params[key]}`;
  });

  return request({ url: `/vocas/search?${paramString}` });
};

export const saveVoca = (data) => {
  return request({ method: 'post', url: '/voca/save', data });
};
