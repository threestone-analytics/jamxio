import ActionTypes from '../../ActionsTypes';

export function save_file(input) {

  return {
    type: ActionTypes.SAVE_FILE,
    payload: { input },
  };
}
