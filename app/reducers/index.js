import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

const isFetching = (state = false, action) => {
  console.log("===== ACTION STORE =====");
  console.log(action);
  return state;
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  routing
});

export default rootReducer;
