import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import DataPage from '../../../pages/Dashboard/Data';
// Actions
import * as modalActions from '../../../redux/reducers/modal/modalActions';
// Selectors
import { getIntl } from '../../../utils/selectors/common';

const actions = [modalActions];

function mapStateToProps(state) {
  return {
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

const data = gql`
  {
    getRecords {
      document {
        documentType {
          category
          subcategory
        }
        title
      }
    }
  }
`;

export default compose(
  graphql(data),
  withProps(({ data: { document  } }) => ({
    d: document,
  })),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DataPage);
