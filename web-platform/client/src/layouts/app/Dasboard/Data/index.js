import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import 'react-widgets/dist/css/react-widgets.css';

// Styles ; FIXME too many styles instead we sould use styled-components

import '../../../../styles/app/components/HomeContainer.scss';
import '../../../../styles/app/components/mapbox-gl.css';
import '../../../../styles/app/components/sidebar.scss';
import '../../../../styles/app/components/app.scss';
import '../../../../styles/app/nav/SideMenu.scss';
import '../../../../styles/app/AppLayout.scss';

// Layouts

import DataContainer from '../../../../containers/Dashboard/Data';
import Fade from '../../../../components/motions/routeTransitions/Fade';

// Components

import { HistoryModal, UploadModal, LoginModal } from '../../../../components/Modal';
import { Toastr } from '../../../../components/Toastr';
import MainMenu from '../../../../components/Nav/Menu';
import Login from '../../../../components/Nav/LogIn';

const DataLayout = ({ location, props }) => (
  <div id="outer-container" location={location}>
    <div className="header-container">
      <MainMenu {...props} />
      <Login {...props} />
    </div>
    <main id="page-wrap">
      <Toastr />
      <HistoryModal />
      <LoginModal />
      <UploadModal {...props}  />
      <Fade location={location}>
        <DataContainer {...props}  />
      </Fade>
    </main>
  </div>
);

DataLayout.propTypes = {
  match: PropTypes.object.isRequired,
  props: PropTypes.object,
  location: PropTypes.object.isRequired,
};

export default withRouter(DataLayout);
