import React from 'react';
import PropTypes from 'prop-types';
import DataCard from '../../components/Card/DataCard';
import { CardContainer, TopBar } from './style';

const DashboardView = props => {
  const handleOpen = name => {
    props.actions.show(name, { message: `This is a ${name} modal`, title: 'Title' });
  };
  if (props.data.getRecords) {
    const listCards = props.data.getRecords.map(record => (
      <DataCard key={record._id} handleOpen={handleOpen} record={record} actions={props.actions} />
    ));
    return (
      <div className="dashboard">
        <TopBar />
        <CardContainer>{listCards}</CardContainer>
      </div>
    );
  }
  return (
    <div className="dashboard">
      <TopBar />
      <CardContainer />
    </div>
  );
};
DashboardView.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default DashboardView;
