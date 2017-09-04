import { combineReducers } from 'redux';
import * as types from '../constants/types';

const getVocabularies = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_VOCABULARIES_SUCCESS:
      return action.vocabularies || state;
    case types.SAVE_VOCABULARY_SUCCESS: {
      const { vocabulary = {} } = action;

      const index = state.findIndex(item => item._id === vocabulary._id);

      if (index === -1) {
        state.unshift(vocabulary);
      } else {
        state[index] = vocabulary;
      }

      return state;
    }
    case types.DELETE_VOCABULARY_SUCCESS: {
      const index = state.findIndex(item => item._id === action._id);

      state.splice(index, 1);

      return state;
    }
    default:
      return state;
  }
};

const getMessage = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.SHOW_VOCABULARY_MESSAGE:
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
    case types.WAIT_VOCABULARY_ACTION:
      return true;
    case types.SAVE_VOCABULARY_SUCCESS:
    case types.DELETE_VOCABULARY_SUCCESS:
    case types.SHOW_VOCABULARY_MESSAGE:
      return false;
    default:
      return state;
  }
};

const vocabularyReducer = combineReducers({
  vocabularies: getVocabularies,
  message: getMessage,
  isWaiting
});

export default vocabularyReducer;
