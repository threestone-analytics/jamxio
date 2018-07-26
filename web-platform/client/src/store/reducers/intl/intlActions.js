import ActionTypes from '../../ActionsTypes';

export function initLocale() {
  return {
    type: ActionTypes.INIT_LOCALE
  };
}

export function setLocale(payload) {
  return {
    type: ActionTypes.SET_INTL_DATA,
    payload
  };
}

export function localeSetRequest() {
  return {
    type: ActionTypes.LOCALE_SET_LANGUAGE_REQUEST
  };
}

export function localeSetSuccess() {
  return {
    type: ActionTypes.LOCALE_SET_LANGUAGE_SUCCESS
  };
}

export function localeSetFailure() {
  return {
    type: ActionTypes.LOCALE_SET_LANGUAGE_FAILURE
  };
}

export function localeConfigRequest() {
  return {
    type: ActionTypes.LOCALE_CONFIG_REQUEST
  };
}

export function localeConfigSuccess() {
  return {
    type: ActionTypes.LOCALE_CONFIG_SUCCESS
  };
}

export function localeConfigFailure() {
  return {
    type: ActionTypes.LOCALE_CONFIG_FAILURE
  };
}
