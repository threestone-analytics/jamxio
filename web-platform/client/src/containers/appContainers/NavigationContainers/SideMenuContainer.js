import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Map } from 'immutable';
// Components
import SideMenu from 'Components/Nav/SideMenu';
// Actions
import { getAuthForm, getIntl } from 'Utils/selectors/common';
import * as authActions from '../../../store/reducers/app/forms/auth/authActions';
import * as intlActions from '../../../store/reducers/intl/intlActions';
// Selectors

const actions = [authActions, intlActions];

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SideMenu));
