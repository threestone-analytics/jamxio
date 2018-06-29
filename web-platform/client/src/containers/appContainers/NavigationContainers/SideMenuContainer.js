import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Map } from 'immutable';
// Components
import SideMenu from '../../../components/Nav/SideMenu';
// Actions
import * as authActions from '../../../redux/reducers/app/forms/auth/authActions';
import * as intlActions from '../../../redux/reducers/intl/intlActions';
// Selectors
import { getAuthForm, getIntl } from '../../../utils/selectors/common';

const actions = [authActions, intlActions];

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SideMenu));
