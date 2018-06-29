import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import 'react-widgets/dist/css/react-widgets.css';
import { HistoryModal, UploadModal } from '../../components/Modal';
import { Toastr } from '../../components/Toastr';
import '../../styles/app/AppLayout.scss';
import '../../styles/app/components/mapbox-gl.css';
import '../../styles/app/components/HomeContainer.scss';
import '../../styles/app/components/sidebar.scss';
import '../../styles/app/components/app.scss';
import '../../styles/app/nav/SideMenu.scss';
// Layouts
import MapLayout from './Dasboard/Map/MapLayout';
import DataLayout from './Dasboard/Data';
/* import MutationLayout from './MutationLayout';
import QueryLayout from './QueryLayout'; */
// Transitions
import Fade from '../../components/motions/routeTransitions/Fade';

const AppLayout = ({ match, location }) => (
  <div id="outer-container" location={location}>
    <main id="page-wrap">
      <Toastr />
      <HistoryModal />
      <UploadModal />
      <Fade location={location}>
        <Switch location={location}>
          <Route component={MapLayout} />
          <Route path={`${match.path}/data`} component={DataLayout} />
          <Route path={`${match.path}/dashboard`} component={MapLayout} />
        </Switch>
      </Fade>
    </main>
  </div>
);

AppLayout.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(AppLayout);
