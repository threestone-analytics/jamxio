import ActionTypes from '../../ActionsTypes';

import InitialState from './dropzoneInitialState';

const initialState = new InitialState();

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.SAVE_FILE:
      return state.setIn(['document'], action.payload.input);
    default:
      return state;
  }
};
