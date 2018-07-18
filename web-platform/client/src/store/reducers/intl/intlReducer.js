import immutable from 'immutable';
import { UPDATE } from 'react-intl-redux';
import initialState from './intlInitialState';
/**
 * ## Global actions
 */
import ActionTypes from '../../ActionsTypes';

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return state.merge(action.payload);
    case ActionTypes.SET_INTL_DATA:
      return state.merge(immutable.fromJS(action.payload.data));
    case ActionTypes.LOCALE_CONFIG_REQUEST:
      return state;
    case ActionTypes.LOCALE_CONFIG_SUCCESS:
      return state;
    case ActionTypes.LOCALE_CONFIG_FAILURE:
      return state;
    default:
      return state;
  }
}
