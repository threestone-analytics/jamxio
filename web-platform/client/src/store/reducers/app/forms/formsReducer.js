import { combineReducers } from 'redux-immutable';
import authFormReducer from './auth/authFormsReducer';

export default combineReducers({
  auth: authFormReducer
});
