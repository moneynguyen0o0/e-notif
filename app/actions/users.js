import { push } from 'react-router-redux';
import { login, signup, logout } from '../utils/api';
import * as types from '../constants/types';

// Log In Action Creators
export const beginLogin = () => {
  return { type: types.LOGIN_USER };
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

export const signUpSuccess = (message) => {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
};

export const beginSignUp = () => {
  return { type: types.SIGNUP_USER };
};

// Log Out Action Creators
export const beginLogout = () => {
  return { type: types.LOGOUT_USER };
};

export const logoutError = () => {
  return { type: types.LOGOUT_ERROR_USER };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch(beginLogin());

    return login(data).then(() => {
        location.href = '/';
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

    return signup(data).then(() => {
        dispatch(signUpSuccess('Sign up seccessfully! Please varify your account!'));
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

    return logout().then(() => {
        location.href = '/';
      })
      .catch(() => {
        dispatch(logoutError());
        dispatch(push('/500'));
      });
  };
};
