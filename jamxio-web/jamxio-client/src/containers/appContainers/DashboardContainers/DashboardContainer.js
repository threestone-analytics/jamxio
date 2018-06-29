import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import DashboardPage from '../../../pages/Dashboard/DashboardPage';
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
)(DashboardPage);
