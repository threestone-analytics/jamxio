import ActionTypes from '../../ActionsTypes';

import InitialState from './alertInitialState';

const initialState = new InitialState();

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.SHOW_ALERT:
      return state.setIn(['isShown'], true);
    case ActionTypes.HIDE_ALERT:
      return state.setIn(['isShown'], false);
    default:
      return state;
  }
};
