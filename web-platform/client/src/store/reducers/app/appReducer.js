import { combineReducers } from 'redux-immutable';
import formsReducer from './forms/formsReducer';
import userReducer from './user/userReducer';

const appReducer = combineReducers({
  user: userReducer,
  forms: formsReducer
});
export default appReducer;
