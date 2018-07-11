import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { compose } from 'recompose';

import DataPage from '../../../pages/Dashboard/Data';
// Actions
import * as modalActions from '../../../redux/reducers/modal/modalActions';
// Selectors
import { getAuthForm, getIntl } from '../../../utils/selectors/common';

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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DataPage);
