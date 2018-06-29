import { NavLink } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';

import { Button } from '../Button/MenuButton';
import React from 'react';

// id={'scaleDown'} pageWrapId={'page-wrap'} outerContainerId={'outer-container'}

const Menu = () =>
  <ButtonGroup className="bm-burger-button">
    <NavLink className="btn-font" replace to="/">
      <Button> Map </Button>
    </NavLink>
    <NavLink className="btn-font" replace to="/data">
      <Button> Data </Button>
    </NavLink>
  </ButtonGroup>;

export default Menu;
