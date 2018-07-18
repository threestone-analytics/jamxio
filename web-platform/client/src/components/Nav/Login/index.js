import React from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Button } from './style';

// Actions
import * as modalActions from '../../../store/reducers/modal/modalActions';

// Selectors
import { getAuthForm, getIntl } from '../../../utils/selectors/common';

const actions = [modalActions];

function mapStateToProps(state) {
  return {
    formState: getAuthForm(state),
    intlState: getIntl(state)
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

const Login = props => {
  const handleOpen = name => {
    props.actions.show(name, { message: `This is a ${name} modal`, title: 'Title' });
  };
  return (
    <div className="nav-buttons-right">
      <Button onClick={() => handleOpen('loginModal')}>Entrar</Button>
      <Button onClick={() => handleOpen('sigupModal')}>Registrarse</Button>
    </div>
  );
};

Login.propTypes = {
  actions: PropTypes.object.isRequired
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);
