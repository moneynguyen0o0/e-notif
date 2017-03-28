import { fetch } from './fetch';

const getVocaList = () => {
  return fetch({ url: '/data' });
};

export default {
  getVocaList
};
