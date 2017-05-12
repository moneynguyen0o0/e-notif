import { push } from 'react-router-redux';
import { getAllPhrases, savePhrase, removePhrase } from '../utils/api';
import * as types from '../constants/types';

export const wait = () => {
  return {
    type: types.WAIT_PHRASE_ACTION
  };
};

export const fetchSuccess = (phrases) => {
  return {
    type: types.FETCH_PHRASES_SUCCESS,
    phrases
  };
};

export const saveSuccess = (phrase) => {
  return {
    type: types.SAVE_PHRASE_SUCCESS,
    phrase
  };
};

export const showMessage = (message) => {
  return {
    type: types.SHOW_PHRASE_MESSAGE,
    message
  };
};

export const removeSuccess = (_id) => {
  return {
    type: types.DELETE_PHRASE_SUCCESS,
    _id
  };
};

export const fetch = () => {
  return (dispatch) => {
    return getAllPhrases()
      .then((response) => {
        dispatch(fetchSuccess(response));
      })
      .catch(() => {
        dispatch(push('/internal-server-error'));
      });
  };
};

export const save = (phrase) => {
  return (dispatch) => {
    dispatch(wait());

    return savePhrase(phrase)
      .then((response) => {
        dispatch(saveSuccess(response));
      })
      .catch(() => {
        dispatch(push('/internal-server-error'));
      });
  };
};

export const remove = (_id) => {
  return (dispatch) => {
    dispatch(wait());

    return removePhrase(_id)
      .then(() => {
        dispatch(removeSuccess(_id));
      })
      .catch(() => {
        dispatch(push('/internal-server-error'));
      });
  };
};
