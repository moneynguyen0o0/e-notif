import { push } from 'react-router-redux';
import fetch from '../utils/fetch';
import * as types from '../constants/types';

const getMessage = res => res.response && res.response.data && res.response.data.message;

// Log In Action Creators
export const beginLogin = () => {
  return { type: types.MANUAL_LOGIN_USER };
};

export const loginSuccess = (message) => {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message
  };
};

export const loginError = (message) => {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
};

// Sign Up Action Creators
export const signUpError = (message) => {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
};

export const beginSignUp = () => {
  return { type: types.SIGNUP_USER };
};

export const signUpSuccess = (message) => {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
};

// Log Out Action Creators
export const beginLogout = () => {
  return { type: types.LOGOUT_USER };
};

export const logoutSuccess = () => {
  return { type: types.LOGOUT_SUCCESS_USER };
};

export const logoutError = () => {
  return { type: types.LOGOUT_ERROR_USER };
};

export const toggleLoginMode = () => {
  return { type: types.TOGGLE_LOGIN_MODE };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch(beginLogin());

    return fetch({ method: 'post', url: '/login', data })
      .then((response) => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message));
          dispatch(push('/'));
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch((err) => {
        dispatch(loginError(getMessage(err)));
      });
  };
};

export const signUp = (data) => {
  return (dispatch) => {
    dispatch(beginSignUp());

    return fetch({ method: 'post', url: '/signup', data })
      .then((response) => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.message));
          dispatch(push('/'));
        } else {
          dispatch(signUpError('Oops! Something went wrong'));
        }
      })
      .catch((err) => {
        dispatch(signUpError(getMessage(err)));
      });
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(beginLogout());

    return fetch({ method: 'post', url: '/logout' })
      .then((response) => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
};
