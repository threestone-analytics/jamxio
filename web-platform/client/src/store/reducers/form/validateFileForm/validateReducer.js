import ActionTypes from '../../../ActionsTypes';

import InitialState from './validateInitialState';

const initialState = new InitialState();

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.SET_CATEGORY:
      return state.setIn(['category'], true);
    case ActionTypes.SET_SUBCATEGORY:
      return state.setIn(['subcategory'], true);
    case ActionTypes.SET_SOURCE:
      return state.setIn(['source'], true);
    case ActionTypes.SET_FILE:
      return state.setIn(['file'], true);
    default:
      return state;
  }
};
