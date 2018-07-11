import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import MapContainer from '../../../../containers/appContainers/DashboardContainers/Map/MapContainer';
import MainMenu from '../../../../components/Nav/Menu';
import Login from '../../../../components/Nav/LogIn';
import '../../../../styles/app/components/mapbox-gl.css';
import '../../../../styles/app/components/HomeContainer.scss';
import '../../../../styles/app/components/sidebar.scss';
import '../../../../styles/app/components/app.scss';
import '../../../../styles/app/components/dashboard.scss';

const DashboardLayout = ({ match, props }) => (
  <div>
    <div className="header-container">
      <MainMenu {...props} />
      <Login {...props} />
    </div>
    <main className="page-wrap">
      <Switch>
        <Fragment>
          <Route path={`${match.path}`} component={MapContainer} />
        </Fragment>
      </Switch>
    </main>
  </div>
);

DashboardLayout.propTypes = {
  match: PropTypes.object.isRequired,
};

export default DashboardLayout;
