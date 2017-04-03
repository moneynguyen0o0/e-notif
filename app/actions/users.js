import { push } from 'react-router-redux';
import { request } from '../utils/request';
import * as types from '../constants/types';

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

    return request({ method: 'post', url: '/login', data })
      .then((response) => {
        const { status, message } = response;

        if (status === 200) {
          dispatch(loginSuccess(message));
          dispatch(push('/'));
        } else {
          dispatch(loginError(message));
        }
      })
      .catch(() => {
        dispatch(push('/500'));
      });
  };
};

export const signUp = (data) => {
  return (dispatch) => {
    dispatch(beginSignUp());

    return request({ method: 'post', url: '/signup', data })
      .then((response) => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.message));
          dispatch(push('/'));
        } else {
          dispatch(signUpError('Oops! Something went wrong'));
        }
      })
      .catch(() => {
        dispatch(push('/500'));
      });
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(beginLogout());

    return request({ url: '/logout' })
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch(() => {
        dispatch(logoutError());
        dispatch(push('/500'));
      });
  };
};
