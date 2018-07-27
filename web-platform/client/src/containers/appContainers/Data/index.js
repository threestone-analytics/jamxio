import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import DataPage from '../../../pages/Data';
// Actions
import * as modalActions from '../../../store/reducers/modal/modalActions';
// Selectors
import { getIntl } from '../../../utils/selectors/common';

const actions = [modalActions];

function mapStateToProps(state) {
  return {
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

const GET_DOCUMENT = gql`
  query {
    getRecords {
      _id
      title
      documentType {
        _id
        category
        subcategory
      }
    }
  }
`;

export default compose(
  graphql(GET_DOCUMENT, {
    options: () => ({
      pollInterval: '500'
    })
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DataPage);
