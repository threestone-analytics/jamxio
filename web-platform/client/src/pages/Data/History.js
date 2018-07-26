import React from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

const DashboardView = props => {
  const handleOpen = name => {
    props.actions.show(name, { message: `This is a ${name} modal`, title: 'Title' });
  };
  return (
    <div key={1}>
      <h2>Dashboard View </h2>
      <button onClick={() => toastr.success('The title', 'The message')} type="button">
        Toastr Success
      </button>
      <button onClick={() => handleOpen('normalModal')} type="button">
        Launch bootstrap modal
      </button>
    </div>
  );
};
DashboardView.propTypes = { actions: PropTypes.object.isRequired };

export default DashboardView;
