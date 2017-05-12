import { combineReducers } from 'redux';
import * as types from '../constants/types';

const getPhrases = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PHRASES_SUCCESS:
      return action.phrases || state;
    case types.SAVE_PHRASE_SUCCESS: {
      const { phrase = {} } = action;

      const index = state.findIndex(item => item._id === phrase._id);

      if (index === -1) {
        state.unshift(phrase);
      } else {
        state[index] = phrase;
      }

      return state;
    }
    case types.DELETE_PHRASE_SUCCESS: {
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
    case types.SHOW_PHRASE_MESSAGE:
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
    case types.WAIT_PHRASE_ACTION:
      return true;
    case types.SAVE_PHRASE_SUCCESS:
    case types.DELETE_PHRASE_SUCCESS:
      return false;
    default:
      return state;
  }
};

const phraseReducer = combineReducers({
  phrases: getPhrases,
  message: getMessage,
  isWaiting
});

export default phraseReducer;
