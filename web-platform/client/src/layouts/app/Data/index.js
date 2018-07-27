import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import 'react-widgets/dist/css/react-widgets.css';
// Containers
import DataContainer from 'Containers/appContainers/Data';

// Components
import MainMenu from 'Components/Nav/Menu';
import Login from 'Components/Nav/Login';
import { Toastr } from 'Components/Toastr';
import { HistoryModal, UploadModal } from 'Components/Modal';

// Styles ; FIXME too many styles instead we sould use styled-components
import '../../../styles/app/map/mapbox-gl.css';
import '../../../styles/app/dashboard/home-container.scss';
import '../../../styles/app/dashboard/dropdown.scss';
import '../../../styles/app/nav/sidebar.scss';
import '../../../styles/app/dashboard/index.scss';

const DataLayout = ({ location, props }) => (
  <div id="outer-container" location={location}>
    <div className="header-container">
      <MainMenu {...props} />
      <Login {...props} />
    </div>
    <main id="page-wrap">
      <Toastr />
      <HistoryModal />
      <UploadModal />
      <DataContainer {...props} />
    </main>
  </div>
);

DataLayout.propTypes = {
  match: PropTypes.object.isRequired,
  props: PropTypes.object,
  location: PropTypes.object.isRequired
};

export default withRouter(DataLayout);
