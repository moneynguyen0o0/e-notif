import { combineReducers } from 'redux';
import * as types from '../constants/types';

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
      return '';
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
      return action.message;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_ERROR_USER:
      return false;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
      return false;
    default:
      return state;
  }
};

const userReducer = combineReducers({
  _id: (state = '') => state,
  isAdmin: (state = false) => state,
  isWaiting,
  authenticated,
  message
});

export default userReducer;
