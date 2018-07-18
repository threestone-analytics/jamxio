import React from 'react';
import PropTypes from 'prop-types';
import { connectModal } from 'redux-modal';
import Modal from 'react-modal';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

/* show, handleHide, message, title */
import { ModalOuter, ModalBox } from './style';

// Actions
import * as alertActions from '../../../store/reducers/alert/alertActions';
import * as dropzoneActions from '../../../store/reducers/dropzone/dropzoneActions';
import * as validateActions from '../../../store/reducers/form/validateFileForm/validateActions';

// Selectors
import { getUploadFileForm, getAlert } from '../../../utils/selectors/common';
import UploadForm from '../../Form/uploadForm';

const actions = [alertActions, dropzoneActions, validateActions];

function mapStateToProps(state) {
  return {
    forms: getUploadFileForm(state),
    alertState: getAlert(state)
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.75)';
Modal.defaultStyles.overlay.zIndex = '999';

Modal.defaultStyles.content = {
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  borderRadius: '4px',
  outline: 'none',
  padding: '20px'
};

const UploadModal = props => (
  <Modal
    isOpen={props.show}
    onRequestClose={props.handleHide}
    contentLabel="Modal"
    ariaHideApp={false}
  >
    <ModalOuter>
      <ModalBox>
        <UploadForm {...props} handleHide={props.handleHide} />
      </ModalBox>
    </ModalOuter>
  </Modal>
);

UploadModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired
};

const UM = compose(
  graphql(
    gql`
      mutation Record($record: DocumentInput) {
        addDocument(record: $record)
      }
    `,
    {
      name: 'addDocument'
    }
  ),
  withHandlers({
    handleAddRecord: ({ addDocument }) => record => {
      addDocument({
        variables: { record }
      });
    }
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UploadModal);

export default connectModal({
  name: 'uploadModal',
  getModalState: state => state.get('modal')
})(UM);
