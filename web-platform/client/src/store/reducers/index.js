import { combineReducers } from 'redux-immutable';
// Reducers
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form/immutable';
import appReducer from './app/appReducer';
import intlReducer from './intl/intlReducer';
import alertReducer from './alert/alertReducer';
import dropzoneReducer from './dropzone/dropzoneReducer';
import uploadFileFormReducer from './form/uploadFileForm/uploadFileFormReducer';
import modalReducer from './modal/modalReducer';

const rootReducer = combineReducers({
  intl: intlReducer,
  toastr: toastrReducer,
  modal: modalReducer,
  form: formReducer,
  alert: alertReducer,
  dropzone: dropzoneReducer,
  uploadFileForm: uploadFileFormReducer,
  app: appReducer
});
export default rootReducer;
