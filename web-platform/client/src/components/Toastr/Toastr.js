import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const Toastr = ({ timeOut, newestOnTop, position, transitionIn, transitionOut }) => (
  <ReduxToastr
    timeOut={timeOut}
    newestOnTop={newestOnTop}
    preventDuplicates
    position={position}
    transitionIn={transitionIn}
    transitionOut={transitionOut}
    progressBar
  />
);

Toastr.defaultProps = {
  timeOut: 4000,
  newestOnTop: false,
  position: 'top-right',
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut'
};

Toastr.propTypes = {
  timeOut: PropTypes.number,
  newestOnTop: PropTypes.bool,
  position: PropTypes.string,
  transitionIn: PropTypes.string,
  transitionOut: PropTypes.string
};

export default Toastr;
