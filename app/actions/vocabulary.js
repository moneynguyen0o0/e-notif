import { push } from 'react-router-redux';
import { getAllVocabularies, saveVocabulary, removeVocabulary } from '../utils/api';
import * as types from '../constants/types';

export const wait = () => {
  return {
    type: types.WAIT_VOCABULARY_ACTION
  };
};

export const fetchSuccess = (vocabularies) => {
  return {
    type: types.FETCH_VOCABULARIES_SUCCESS,
    vocabularies
  };
};

export const saveSuccess = (vocabulary) => {
  return {
    type: types.SAVE_VOCABULARY_SUCCESS,
    vocabulary
  };
};

export const showMessage = (message) => {
  return {
    type: types.SHOW_VOCABULARY_MESSAGE,
    message
  };
};

export const removeSuccess = (_id) => {
  return {
    type: types.DELETE_VOCABULARY_SUCCESS,
    _id
  };
};

export const fetch = () => {
  return (dispatch) => {
    return getAllVocabularies()
      .then((response) => {
        dispatch(fetchSuccess(response));
      })
      .catch(() => {
        dispatch(push('/internal-server-error'));
      });
  };
};

export const save = (vocabulary) => {
  return (dispatch) => {
    dispatch(wait());

    return saveVocabulary(vocabulary)
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

    return removeVocabulary(_id)
      .then(() => {
        dispatch(removeSuccess(_id));
      })
      .catch(() => {
        dispatch(push('/internal-server-error'));
      });
  };
};
