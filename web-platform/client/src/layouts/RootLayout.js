import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import MapLayout from './app/Map';
import DataLayout from './app/Data';

/* import AuthLayout from './auth/AuthLayout'; */

const RootLayout = ({ loggedInUser, loading }) =>
  loggedInUser ? (
    // private routes
    <Switch>
      <Route path="/home" component={MapLayout} />
      <Route path="/data" component={DataLayout} />
      <Route render={() => <Redirect to="/home" />} />
    </Switch>
  ) : !loading ? (
    // public routes
    <Switch>
      <Route path="/home" component={MapLayout} />
      <Route path="/data" component={MapLayout} />
      <Route render={() => <Redirect to="/home" />} />
    </Switch>
  ) : (
    <Switch />
  );
RootLayout.defaultProps = {
  loggedInUser: false
};

RootLayout.propTypes = {
  loggedInUser: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  loading: PropTypes.bool.isRequired
};

export default RootLayout;
