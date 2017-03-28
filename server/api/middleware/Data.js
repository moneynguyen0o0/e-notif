import { version } from '../../../package.json';

export const getData = (res) => {
  res.json(version);
};
