import React from 'react';
/* show, handleHide, message, title */
import { Alert } from './style';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
// Components

// Actions
import * as alertActions from '../../redux/reducers/alert/alertActions';

// Selectors
import { getAlert } from '../../utils/selectors/common';

const AlertText = ( props ) => {
  return (
<Alert isOpen={props.alertState.isShown} red>* Fallo al ser comparado con el esquema</Alert>

);
}


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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertText);