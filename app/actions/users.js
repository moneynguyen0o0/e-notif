import { push } from 'react-router-redux';
import { request } from '../utils/request';
import * as types from '../constants/types';

// Log In Action Creators
export const beginLogin = () => {
  return { type: types.LOGIN_USER };
};

export const loginSuccess = (_id) => {
  return {
    type: types.LOGIN_SUCCESS_USER,
    _id
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

export const login = (data) => {
  return (dispatch) => {
    dispatch(beginLogin());

    return request({ method: 'post', url: '/login', data })
      .then((response) => {
        const { _id } = response;

        dispatch(loginSuccess(_id));
        dispatch(push('/'));
      })
      .catch((error) => {
        const { response } = error;

        if (response) {
          const { data: { message = '' } = {} } = response;

          dispatch(loginError(message));
        } else {
          dispatch(push('/500'));
        }
      });
  };
};

export const signup = (data) => {
  return (dispatch) => {
    dispatch(beginSignUp());

    return request({ method: 'post', url: '/signup', data })
      .then(() => {
        dispatch(signUpSuccess());
        dispatch(push('/'));
      })
      .catch((error) => {
        const { response } = error;

        if (response) {
          const { data: { message = '' } = {} } = response;

          dispatch(signUpError(message));
        } else {
          dispatch(push('/500'));
        }
      });
  };
};

export const logout = () => {
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
