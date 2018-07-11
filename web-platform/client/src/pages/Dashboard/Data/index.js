import React from 'react';
import PropTypes from 'prop-types';
import DataCard from '../../../components/DataCard';
import TopBar from '../../../components/Nav/TopBar';
import { CardContainer } from './style';

const DashboardView = props => {
  const handleOpen = name => {
    props.actions.show(name, { message: `This is a ${name} modal`, title: 'Title' });
  };

  const listCards = props.data.getRecords.map(data => {
    console.log(data)
    return <DataCard key={data} handleOpen={handleOpen} data={data} />;
  });

  return (
    <div className="dashboard">
      <TopBar />
      <CardContainer>{listCards}</CardContainer>
    </div>
  );
};
DashboardView.propTypes = { actions: PropTypes.object.isRequired };

export default DashboardView;
