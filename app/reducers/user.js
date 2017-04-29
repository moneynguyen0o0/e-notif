import { combineReducers } from 'redux';
import * as types from '../constants/types';

const getMessage = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
    case types.UPDATE_USER:
      return '';
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.UPDATE_ERROR_USER:
    case types.UPDATE_SUCCESS_USER:
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
    case types.UPDATE_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_ERROR_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.UPDATE_ERROR_USER:
    case types.UPDATE_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const getUserData = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.UPDATE_SUCCESS_USER:
      return action.user;
    default:
      return state;
  }
};

const userReducer = combineReducers({
  data: getUserData,
  authenticated: (state = false) => state,
  message: getMessage,
  isWaiting
});

export default userReducer;
