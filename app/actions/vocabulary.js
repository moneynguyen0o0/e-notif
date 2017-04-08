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

export const removeSuccess = (id) => {
  return {
    type: types.DELETE_VOCABULARY_SUCCESS,
    id
  };
};

export const fetch = () => {
  return (dispatch) => {
    return getAllVocabularies()
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchSuccess(response.data));
        } else {
          dispatch(showMessage(response.message));
        }
      })
      .catch(() => {
        dispatch(push('/500'));
      });
  };
};

export const save = (vocabulary) => {
  return (dispatch) => {
    dispatch(wait());

    return saveVocabulary(vocabulary)
      .then((response) => {
        if (response.status === 200) {
          dispatch(saveSuccess(response.data));
        }

        dispatch(showMessage(response.message));
      })
      .catch(() => {
        dispatch(push('/500'));
      });
  };
};

export const remove = (id) => {
  return (dispatch) => {
    dispatch(wait());

    return removeVocabulary(id)
      .then((response) => {
        if (response.status === 200) {
          dispatch(removeSuccess(id));
        }

        dispatch(showMessage(response.message));
      })
      .catch(() => {
        dispatch(push('/500'));
      });
  };
};
