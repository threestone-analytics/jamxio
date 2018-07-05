import React from 'react';
import { Button } from './style';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

// id={'scaleDown'} pageWrapId={'page-wrap'} outerContainerId={'outer-container'}

// Actions
import * as modalActions from '../../redux/reducers/modal/modalActions';
// Selectors
import { getAuthForm, getIntl } from '../../utils/selectors/common';

const actions = [modalActions];

function mapStateToProps(state) {
  return {
    formState: getAuthForm(state),
    intlState: getIntl(state),
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

const LogIn = props => {
  const handleOpen = name => {
    props.actions.show(name, { message: `This is a ${name} modal`, title: 'Title' });
  };
  return (
    <div className="init-buttons">
      <Button onClick={() => handleOpen('loginModal')}>Entrar</Button>
      <Button onClick={() => handleOpen('sigupModal')}>Registrase</Button>
    </div>
  );
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LogIn);
