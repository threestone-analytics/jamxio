import { NavLink } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';
import React from 'react';
import { Button } from './style';

const Menu = () => (
  <ButtonGroup className="nav-buttons">
    <NavLink replace to="/">
      <Button> Mapa </Button>
    </NavLink>
    <NavLink replace to="/data">
      <Button> Datos </Button>
    </NavLink>
  </ButtonGroup>
);

export default Menu;
