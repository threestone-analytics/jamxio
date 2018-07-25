import { Record } from 'immutable';
import ActionTypes from '../../../../ActionsTypes';

export default Record({
  authType: ActionTypes.SIGNIN_STATEFORM,
  error: null,
  isFetching: false,
  showPassword: false
});
