import ActionTypes from '../../ActionsTypes';

export function showItems() {
  return {
    type: ActionTypes.SHOW_ITEMS
  };
}

export function hideItems() {
  return {
    type: ActionTypes.HIDE_ITEMS
  };
}

export function toggleItems(input) {
  return {
    type: ActionTypes.TOGGLE_ITEMS,
    payload: { input }
  };
}
