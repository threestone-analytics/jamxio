import InitialState from './userInitialState';
/**
 * ## Auth actions
 */
import themes from '../../../../styles/theme';
import ActionTypes from '../../../ActionsTypes';

const initialState = new InitialState();

export default function authFormsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CHANGETHEME:
      return state
        .setIn(['theme', 'name'], action.payload)
        .setIn(['theme', 'selected'], themes[action.payload]);
    default:
      return state;
  }
}
