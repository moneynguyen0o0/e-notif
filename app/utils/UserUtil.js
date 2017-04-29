import _ from 'lodash';

const ADMIN = 'ADMIN';

export const isAdmin = (user = {}) => {
  return _.includes(user.roles, ADMIN);
};
