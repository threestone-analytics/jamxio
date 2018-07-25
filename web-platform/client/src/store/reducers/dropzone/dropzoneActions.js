import ActionTypes from '../../ActionsTypes';

export function saveFile(input) {
  return {
    type: ActionTypes.SAVE_FILE,
    payload: { input }
  };
}
