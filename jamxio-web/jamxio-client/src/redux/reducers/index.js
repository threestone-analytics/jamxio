import { combineReducers } from 'redux-immutable';
// Reducers
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form/immutable';
import routerReducer from './router';
import appReducer from './app/appReducer';
import alertReducer from './alert/alertReducer';
import intlReducer from './intl/intlReducer';
import modalReducer from './modal/modalReducer';
import dropzoneReducer from './dropzone/dropzoneReducer';
import uploadFileFormReducer from './form/uploadFileForm/uploadFileFormReducer';
import validateFormReducer from './form/validateFileForm/validateReducer';

const rootReducer = combineReducers({
  intl: intlReducer,
  routing: routerReducer,
  toastr: toastrReducer,
  modal: modalReducer,
  alert: alertReducer,
  dropzone:dropzoneReducer,
  form: formReducer,
  app: appReducer,
  uploadFileForm: uploadFileFormReducer,
  validateUploadForm: validateFormReducer,

});
export default rootReducer;
