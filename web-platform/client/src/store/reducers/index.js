import { combineReducers } from 'redux-immutable';
// Reducers
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form/immutable';
import appReducer from './app/appReducer';
import intlReducer from './intl/intlReducer';
import alertReducer from './alert/alertReducer';
import dropzoneReducer from './dropzone/dropzoneReducer';
import uploadFileFormReducer from './form/uploadFileForm/uploadFileFormReducer';
import dropdownReducer from './dropdown/dropdownReducer';
import modalReducer from './modal/modalReducer';

const rootReducer = combineReducers({
  app: appReducer,
  intl: intlReducer,
  form: formReducer,
  modal: modalReducer,
  alert: alertReducer,
  toastr: toastrReducer,
  dropzone: dropzoneReducer,
  dropdown: dropdownReducer,
  uploadFileForm: uploadFileFormReducer
});
export default rootReducer;
