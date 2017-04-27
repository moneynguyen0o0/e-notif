import _ from 'lodash';

export const ADMIN = 'ADMIN';
export const USER = 'USER';

const isAdmin = (roles) => {
  return _.includes(roles, ADMIN);
};

export default {
  isAdmin
};
