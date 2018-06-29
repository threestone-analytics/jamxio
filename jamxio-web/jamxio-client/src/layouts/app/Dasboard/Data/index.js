import PropTypes from 'prop-types';
import React  from 'react';
import { withRouter } from 'react-router-dom';
import { HistoryModal, UploadModal, LoginModal } from '../../../../components/Modal';


//FIXME too many styles instead we sould use styled-components
import '../../../../styles/app/components/HomeContainer.scss';
import '../../../../styles/app/components/mapbox-gl.css';
import '../../../../styles/app/components/sidebar.scss';
import '../../../../styles/app/components/app.scss';
import '../../../../styles/app/nav/SideMenu.scss';
import 'react-widgets/dist/css/react-widgets.css';
import '../../../../styles/app/AppLayout';


import { Toastr } from '../../../../components/Toastr';
import MainMenu from '../../../../components/Menu';
import Login from '../../../../components/LogIn';

// Layouts

import DataContainer from '../../../../containers/appContainers/DashboardContainers/Data';
/* import MutationLayout from './MutationLayout';
import QueryLayout from './QueryLayout'; */
// Transitions
import Fade from '../../../../components/motions/routeTransitions/Fade';

const DataLayout = ({ location, props, actions }) => (
  <div id="outer-container" location={location}>
    <div className="header-container">
      <MainMenu {...props} />
      <Login {...props} />
    </div>
    <main id="page-wrap">
      <Toastr />
      <HistoryModal />
      <LoginModal />
      <UploadModal {...props}/>
      <Fade location={location}>
        <DataContainer {...props}/>
      </Fade>
    </main>
  </div>
);

DataLayout.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(DataLayout);
