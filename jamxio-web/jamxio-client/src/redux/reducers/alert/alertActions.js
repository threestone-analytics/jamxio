import ActionTypes from '../../ActionsTypes';

export function show_alert(alert, props = {}) {
  return {
    type: ActionTypes.SHOW_ALERT
  };
}

export function hide_alert(alert) {
  return {
    type: ActionTypes.HIDE_ALERT
  };
}

export function destroy_alert(alert) {
  return {
    type: ActionTypes.DESTROY_ALERT
  };
}
