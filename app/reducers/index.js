import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import user from './user';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  user,
  routing
});

export default rootReducer;
