import _ from 'lodash';
import * as Role from '../constants/Role';

const isAdmin = (user = {}) => {
  return _.includes(user.roles, Role.ADMIN);
};

export default {
  isAdmin
};
