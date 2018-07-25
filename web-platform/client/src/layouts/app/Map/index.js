import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import MapContainer from '../../../containers/appContainers/Map';
import MainMenu from '../../../components/Nav/Menu';
import Login from '../../../components/Nav/Login';
import '../../../styles/app/map/mapbox-gl.css';
import '../../../styles/app/dashboard/home-container.scss';
import '../../../styles/app/nav/sidebar.scss';
import '../../../styles/app/dashboard/index.scss';

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
  props: PropTypes.object.isRequired
};

export default DashboardLayout;
