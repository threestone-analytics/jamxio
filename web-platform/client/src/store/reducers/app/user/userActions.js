import ActionTypes from '../../../ActionsTypes';

export function changeTheme(payload) {
  return {
    type: ActionTypes.CHANGETHEME,
    payload
  };
}
