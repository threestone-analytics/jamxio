const SHOW = '@redux-modal/SHOW';
const HIDE = '@redux-modal/HIDE';
const DESTROY = '@redux-modal/DESTROY';

export function show(modal, props = {}) {
  return {
    type: SHOW,
    payload: {
      modal,
      props
    }
  };
}

export function hide(modal) {
  return {
    type: HIDE,
    payload: {
      modal
    }
  };
}

export function destroy(modal) {
  return {
    type: DESTROY,
    payload: {
      modal
    }
  };
}
