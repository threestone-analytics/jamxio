import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import DashboardContainer from 'Containers/appContainers/DashboardContainer';

const DashboardLayout = ({ match }) => (
  <Switch>
    <Route path={`${match.path}`} component={DashboardContainer} />
  </Switch>
);

DashboardLayout.propTypes = {
  match: PropTypes.object.isRequired
};

export default DashboardLayout;
