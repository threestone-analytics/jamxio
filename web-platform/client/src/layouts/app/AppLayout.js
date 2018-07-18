import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Modal } from 'Components/Modal';
import { Toastr } from 'Components/Toastr';
import SideMenu from 'Containers/appContainers/NavigationContainers/SideMenuContainer';
// Layouts
import Fade from 'Components/motions/routeTransitions/Fade';
import DashBoardLayout from './DashboardLayout';
/* import MutationLayout from './MutationLayout';
import QueryLayout from './QueryLayout'; */
// Transitions

const AppLayout = ({ match, location }) => (
  <div id="outer-container" location={location}>
    <SideMenu />
    <main id="page-wrap">
      <Toastr />
      <Modal />
      <Fade location={location}>
        <Switch location={location}>
          <Route path={`${match.path}/dashboard`} component={DashBoardLayout} />
          <Route render={DashBoardLayout} />
          {/* <Route path={`${match.path}/mutation`} component={MutationLayout} />
<Route path={`${match.path}/query`} component={QueryLayout} /> */}
        </Switch>
      </Fade>
    </main>
  </div>
);

AppLayout.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(AppLayout);
