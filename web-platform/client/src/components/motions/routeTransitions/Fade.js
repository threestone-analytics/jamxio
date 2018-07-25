import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Fade = ({ children, location, ...props }) => (
  <TransitionGroup appear exit={false} className="page-main">
    <CSSTransition key={location.key} {...props} timeout={1800} classNames="fadeViewTransition">
      {children}
    </CSSTransition>
  </TransitionGroup>
);

Fade.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
};

export default Fade;
