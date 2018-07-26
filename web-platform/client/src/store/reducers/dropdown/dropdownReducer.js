import Immutable from 'immutable';
import ActionTypes from '../../ActionsTypes';

const initialState = Immutable.fromJS({});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_ITEMS:
      if (state[action.payload.input]) {
        return {
          [action.payload.input]: {
            show: !state[action.payload.input].show
          }
        };
      }
      return {
        [action.payload.input]: {
          show: true
        }
      };

    default:
      return state;
  }
};
