import { actionTypes as ActionTypesReduxForm } from 'redux-form';
import InitialState from './authFormInitialState';
/**
 * ## Auth actions
 */
import ActionTypes from '../../../../ActionsTypes';

const initialState = new InitialState();
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function authFormsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypesReduxForm.RESET:
      return state.setIn(['error'], null).setIn(['showPassword'], false);
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case ActionTypes.DELETE_SESSIONTOKEN_REQUEST:
    case ActionTypes.SIGNUP_REQUEST:
    case ActionTypes.LOGOUT_REQUEST:
    case ActionTypes.SIGNIN_REQUEST:
    case ActionTypes.RESET_PASSWORD_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    /**
     * ### Requests end, good or bad
     * Set the fetching flag so the forms will be enabled
     */
    case ActionTypes.DELETE_SESSIONTOKEN_SUCCESS:
    case ActionTypes.DELETE_SESSIONTOKEN_FAILURE:
    case ActionTypes.SIGNUP_SUCCESS:
    case ActionTypes.SIGNIN_SUCCESS:
    case ActionTypes.LOGOUT_SUCCESS:
    case ActionTypes.RESET_PASSWORD_SUCCESS:
      return state.setIn(['isFetching'], false);
    /**
     * ### Access to Parse.com denied or failed
     * The fetching is done, but save the error
     * for display to the user
     */
    case ActionTypes.SIGNUP_FAILURE:
    case ActionTypes.LOGOUT_FAILURE:
    case ActionTypes.SIGNIN_FAILURE:
    case ActionTypes.RESET_PASSWORD_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.payload);
    /**
     * ### Auth form field change
     *
     * Set the form's field with the value
     * Clear the forms error
     * Pass the fieldValidation results to the
     * the formValidation
     */

    case ActionTypes.ON_AUTH_FORM_FIELD_CHANGE: {
      const { field, value } = action.payload;
      switch (field) {
        case 'showPassword':
          return state.setIn(['showPassword'], value).setIn(['error'], null);

        default:
          return state;
      }
    }

    /*
    * ## Default
   */
    default:
      return state;
  }
}
