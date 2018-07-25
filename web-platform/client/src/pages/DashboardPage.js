import React from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';


const DashboardView = props => {
  const handleOpen = name => {
    props.actions.show(name, { message: `This is a ${name}`, title: 'Title' });
  };
  return (
    <div key={1}>
      <h2>Dashboard View</h2>
      <button onClick={() => toastr.success('The title', 'The message')} type="button">
        Toastr Succes
      </button>
      <button onClick={() => handleOpen('normalModal')} type="button">
        Launch bootstrap modall
      </button>
      <button onClick={() => props.actions.changeTheme('light')} type="button">
        Chage Theme Light
      </button>
      <button onClick={() => props.actions.changeTheme('dark')} type="button">
        Chage Theme Dark
      </button>
    </div>
  );
};
DashboardView.propTypes = { actions: PropTypes.object.isRequired };

export default DashboardView;
