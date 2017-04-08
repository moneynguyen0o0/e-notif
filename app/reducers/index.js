import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import user from './user';
import vocabulary from './vocabulary';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  user,
  vocabulary,
  routing
});

export default rootReducer;
