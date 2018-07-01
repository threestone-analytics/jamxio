import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppLayout from './app/AppLayout';
import DataLayout from './app/Dasboard/Data';
/* import AuthLayout from './auth/AuthLayout'; */

const RootLayout = ({ loggedInUser, loading }) =>
  loggedInUser ? (
    // private routes
    <Switch>
      <Route render={() => <Redirect to="/auth" />} />
    </Switch>
  ) : !loading ? (
    // public routes
    <Switch>
      <Route path="/app" component={AppLayout} />
      <Route path="/data" component={DataLayout} />
      <Route render={() => <Redirect to="/app" />} />
    </Switch>
  ) : (
    <Switch />
  );

RootLayout.defaultProps = {
  loggedInUser: false,
};

RootLayout.propTypes = {
  loggedInUser: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  loading: PropTypes.bool.isRequired,
};

export default RootLayout;
