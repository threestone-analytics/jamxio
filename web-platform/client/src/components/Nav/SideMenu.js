import React from 'react';
import ApolloClient from 'apollo-client';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { push as MenuContainer } from 'react-burger-menu';

import '../../styles/app/nav/SideMenu.scss';

const AppSideMenu = ({ actions, client }) => (
  <MenuContainer pageWrapId="page-wrap" outerContainerId="outer-container">
    <NavLink id="dashboard" className="menu-item" to="/app/dashboard">
      Dashboard
    </NavLink>
    <NavLink id="map" className="menu-item" to="/app/mutation">
      Mutation
    </NavLink>
    <NavLink id="chart" className="menu-item" to="/app/query">
      Query
    </NavLink>
    <button
      type="button"
      onClick={() => {
        actions.signInStateForm();
        actions.logOut(client);
      }}
    >
      Logout
    </button>
  </MenuContainer>
);

AppSideMenu.propTypes = {
  client: PropTypes.instanceOf(ApolloClient).isRequired,
  actions: PropTypes.object.isRequired
};

export default withApollo(AppSideMenu);
