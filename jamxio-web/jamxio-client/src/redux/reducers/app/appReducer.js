import { combineReducers } from 'redux-immutable';
import formsReducer from './forms/formsReducer';

const appReducer = combineReducers({
  forms: formsReducer,
});
export default appReducer;
