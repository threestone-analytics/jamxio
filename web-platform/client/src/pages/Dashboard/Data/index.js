import React from 'react';
import PropTypes from 'prop-types';
import DataCard from '../../../components/DataCard';
import TopBar from '../../../components/Nav/TopBar';
import { CardContainer } from './style';

const DashboardView = props => {
  const handleOpen = name => {
    props.actions.show(name, { message: `This is a ${name} modal`, title: 'Title' });
  };
  if (props.data.getRecords) {
    const listCards = props.data.getRecords.map((data, index)  => {
      return <DataCard key={index} handleOpen={handleOpen} data={data} actions={props.actions} />;
    });
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
DashboardView.propTypes = { actions: PropTypes.object.isRequired };

export default DashboardView;
