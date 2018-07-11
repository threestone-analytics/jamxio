import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  position: absolute;
  width: 100%;
  height: 85px;
  left: 0%;
  right: 0%;
  top: 0%;
  z-index: 995;
  position: fixed;
`;

const TopBar = () => <Bar />;

export default TopBar;
