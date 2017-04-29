import { push } from 'react-router-redux';
import * as API from '../utils/api';
import * as types from '../constants/types';

export const beginLogin = () => {
  return { type: types.LOGIN_USER };
};

export const loginError = (message) => {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
};

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

export const beginLogout = () => {
  return { type: types.LOGOUT_USER };
};

export const logoutError = () => {
  return { type: types.LOGOUT_ERROR_USER };
};

export const updateError = (message) => {
  return {
    type: types.UPDATE_ERROR_USER,
    message
  };
};

export const updateSuccess = (user, message) => {
  return {
    type: types.UPDATE_SUCCESS_USER,
    user,
    message
  };
};

export const beginUpdate = () => {
  return { type: types.UPDATE_USER };
};

export const login = (user) => {
  return (dispatch) => {
    dispatch(beginLogin());

    return API.login(user).then(() => {
        location.href = '/';
      })
      .catch((error) => {
        const { response } = error;

        if (response) {
          const { data: { message = '' } = {} } = response;

          dispatch(loginError(message));
        } else {
          dispatch(push('/internal-server-error'));
        }
      });
  };
};

export const signup = (user) => {
  return (dispatch) => {
    dispatch(beginSignUp());

    return API.signup(user).then(() => {
        dispatch(signUpSuccess('Sign up seccessfully! Please varify your account!'));
      })
      .catch((error) => {
        const { response } = error;

        if (response) {
          const { data: { message = '' } = {} } = response;

          dispatch(signUpError(message));
        } else {
          dispatch(push('/internal-server-error'));
        }
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(beginLogout());

    return API.logout().then(() => {
        location.href = '/';
      })
      .catch(() => {
        dispatch(logoutError());
        dispatch(push('/internal-server-error'));
      });
  };
};

export const update = (user) => {
  return (dispatch) => {
    dispatch(beginUpdate());

    return API.updateProfile(user).then(() => {
        dispatch(updateSuccess(user, 'Your profile changed success'));
      })
      .catch((error) => {
        const { response } = error;

        if (response) {
          const { data: { message = '' } = {} } = response;

          dispatch(updateError(message));
        } else {
          dispatch(push('/internal-server-error'));
        }
      });
  };
};
