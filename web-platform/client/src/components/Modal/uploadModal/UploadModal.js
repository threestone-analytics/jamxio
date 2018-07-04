import React from 'react';
import PropTypes from 'prop-types';
import { connectModal } from 'redux-modal';
import Modal from 'react-modal';
import {UploadForm} from '../../../components/Form';

/* show, handleHide, message, title */
import { ModalOuter, Button, ModalBox, ModalButtonBox, DropzoneBox, Alert, AlertBox } from './style';

import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

// Actions
import * as alertActions from '../../../redux/reducers/alert/alertActions';
import * as dropzoneActions from '../../../redux/reducers/dropzone/dropzoneActions';
import * as validateActions from '../../../redux/reducers/form/validateFileForm/validateActions';
// Selectors
import { getAlert, getDropzone , getUploadFileForm, getValidateUploadFrom } from '../../../utils/selectors/common';

const actions = [alertActions,dropzoneActions,validateActions];

function mapStateToProps(state) {
  return {
    alertState: getAlert(state),
    dropzone: getDropzone(state),
    uploadFileForm: getUploadFileForm(state),
    validateUploadForm: getValidateUploadFrom(state),
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  };
}

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.75)';
Modal.defaultStyles.overlay.zIndex = '999';

Modal.defaultStyles.content = {
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  borderRadius: '4px',
  outline: 'none',
  padding: '20px',
};




const UploadModal = props => {

  console.log(props);

  const handleSubmit = () => {
    
    

    const file = {
      user: "alexter42",
      category : "props.uploadFileForm.uploadForm.values.subcategory",
      subcategory : "props.uploadFileForm.uploadForm.values.subcategory",
      source : "props.uploadFileForm.uploadForm.values.source",
      title : "props.uploadFileForm.uploadForm.values.subcategory",
      data : "props.dropzone.file",
    }
    
  
    

  };
   
 return (
    <Modal isOpen={props.show} onRequestClose={props.handleHide} contentLabel="Modal" ariaHideApp={false}>
    <ModalOuter>
      <ModalBox>
        <UploadForm handleHide={props.handleHide} handleSubmit={handleSubmit} {...props} />
      </ModalBox>
    </ModalOuter>
  </Modal>
  );
};

UploadModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleHide: PropTypes.func.isRequired,
};

const UM =  compose(
  graphql(
    gql`
    mutation addRecord($file: FileInput) {
      addRecord(file: $file)
    }
    `,
    {
      name: 'addRecord',
    }
  ),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UploadModal);


export default connectModal({
  name: 'uploadModal',
  getModalState: state => state.get('modal'),
})(UM);


