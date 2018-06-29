import React from 'react';
import PropTypes from 'prop-types';
import { connectModal } from 'redux-modal';
import Modal from 'react-modal';
import {LoginForm} from '../../../components/Form';

/* show, handleHide, message, title */
import { ModalOuter, ExitButton, ModalBox, ModalButtonBox, DropzoneBox, Alert, AlertBox, ModalHeader, Title, ModalTitleBox } from './style';

import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

// Actions
import * as alertActions from '../../../redux/reducers/alert/alertActions';

// Selectors
import { getAlert } from '../../../utils/selectors/common';

const actions = [alertActions];

function mapStateToProps(state) {
  return {
    alertState: getAlert(state),

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


const LoginModal = props => {

  const handleSubmit = () => {
    
    const file = props.dropzone.file;
    const subcategory = props.uploadFileForm.uploadForm.values.subcategory;
    const source = props.uploadFileForm.uploadForm.values.source;


    console.log(file,subcategory,source, props.handleHide, "carnita");
    alert("hi")
  };
   
 return (
    <Modal isOpen={props.show} onRequestClose={props.handleHide} contentLabel="Modal" ariaHideApp={false}>
    <ModalOuter>
      <ModalBox>
        <ModalHeader>
          <Title>LOG IN</Title>
          <ExitButton onClick={props.handleHide}>X</ExitButton>
        </ModalHeader>
        <LoginForm handleHide={props.handleHide} handleSubmit={handleSubmit} {...props} />
      </ModalBox>
    </ModalOuter>
  </Modal>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleHide: PropTypes.func.isRequired,
};

const LM =  compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginModal);


export default connectModal({
  name: 'loginModal',
  getModalState: state => state.get('modal'),
})(LM);


