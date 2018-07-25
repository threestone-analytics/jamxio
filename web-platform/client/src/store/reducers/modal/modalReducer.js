import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

const SHOW = '@redux-modal/SHOW';
const HIDE = '@redux-modal/HIDE';
const DESTROY = '@redux-modal/DESTROY';

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        [action.payload.modal]: {
          show: true,
          props: action.payload.props
        }
      };
    case HIDE:
      return {
        ...state,
        [action.payload.modal]: {
          ...state[action.payload.modal],
          show: false
        }
      };
    case DESTROY:
      return {
        ...state,
        [action.payload.modal]: undefined
      };
    default:
      return state;
  }
};
