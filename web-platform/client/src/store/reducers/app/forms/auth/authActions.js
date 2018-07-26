import ActionTypes from '../../../../ActionsTypes';

export function logOutStateForm() {
  return {
    type: ActionTypes.LOGOUT_STATEFORM
  };
}
export function signUpStateForm() {
  return {
    type: ActionTypes.SIGNUP_STATEFORM
  };
}

export function signInStateForm() {
  return {
    type: ActionTypes.SIGNIN_STATEFORM
  };
}
export function forgotPasswordStateForm() {
  return {
    type: ActionTypes.FORGOT_PASSWORD_STATEFORM
  };
}
/**
 * ## Logout actions
 */
export function logOutRequest() {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  };
}

export function logOutSuccess() {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  };
}
export function logOutFailure(error) {
  return {
    type: ActionTypes.LOGOUT_FAILURE,
    payload: error
  };
}
/**
 * ## Logout
 */

export function logOut(apolloClient) {
  return {
    type: ActionTypes.LOGOUT,
    payload: { apolloClient }
  };
}

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */

export function onAuthFormFieldChange(field, value) {
  return {
    type: ActionTypes.ON_AUTH_FORM_FIELD_CHANGE,
    payload: { field, value }
  };
}

/**
 * ## Signup actions
 */
export function signUpRequest() {
  return {
    type: ActionTypes.SIGNUP_REQUEST
  };
}
export function signUpSuccess() {
  return {
    type: ActionTypes.SIGNUP_SUCCESS
  };
}
export function signUpFailure(error) {
  return {
    type: ActionTypes.SIGNUP_FAILURE,
    payload: error
  };
}

/**
 * ## DeleteToken actions
 */

export function deleteSessionTokenRequest() {
  return {
    type: ActionTypes.DELETE_SESSIONTOKEN_REQUEST
  };
}
export function deleteSessionTokenSuccess() {
  return {
    type: ActionTypes.DELETE_SESSIONTOKEN_SUCCESS
  };
}
export function deleteSessionTokenFailure() {
  return {
    type: ActionTypes.DELETE_SESSIONTOKEN_FAILURE
  };
}

/**
 * ## signup
 * @param {string} username - name of user
 * @param {string} email - user's email
 * @param {string} password - user's password
 **
 * Otherwise, dispatch the error so the user can see
 */

export function signUp(username, email, password, apolloClient) {
  return {
    type: ActionTypes.SIGNUP,
    payload: { username, email, password, apolloClient }
  };
}

/**
 * ## SIGNIN actions
 */

export function signInRequest() {
  return {
    type: ActionTypes.SIGNIN_REQUEST
  };
}

export function signInSuccess() {
  return {
    type: ActionTypes.SIGNIN_SUCCESS
  };
}

export function signInFailure(error) {
  return {
    type: ActionTypes.SIGNIN_FAILURE,
    payload: error
  };
}

export function signIn(email, password, apolloClient) {
  return {
    type: ActionTypes.SIGNIN,
    payload: { email, password, apolloClient }
  };
}

export function forgotPassword() {}
