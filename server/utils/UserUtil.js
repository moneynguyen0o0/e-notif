import _ from 'lodash';
import * as Role from '../constants/Role';

export const isAdmin = (user = {}) => {
  return _.includes(user.roles, Role.ADMIN);
};

export const pickUser = (user) => {
  return _.pick(user, [ '_id', 'email', 'firstname', 'lastname', 'roles', 'dob', 'gender', 'created']);
};
