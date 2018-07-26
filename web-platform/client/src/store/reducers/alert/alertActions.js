import ActionTypes from '../../ActionsTypes';

export function showAlert() {
  return {
    type: ActionTypes.SHOW_ALERT
  };
}

export function hideAlert() {
  return {
    type: ActionTypes.HIDE_ALERT
  };
}
