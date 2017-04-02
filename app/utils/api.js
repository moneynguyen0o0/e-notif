import { request } from './request';

export const getVocas = () => {
  return request({ url: '/vocas' });
};

export const saveVoca = (data) => {
  return request({ method: 'post', url: '/voca/save', data });
};
