import styled from 'styled-components';

export const GeoDataContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 301px;
  max-width: 320px;
  margin: 20px;
  margin-right: 10%;
  margin-top: 100px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  font-size: 13px;
  line-height: 2;
  outline: none;
  color: #000;
  text-transform: uppercase;
  vertical-align: middle;
  z-index: 98;
`;
export const PanelHeader = styled.h5`
  width: 100%;
  height: 40px;
  position: relative;
  top: 0;
  padding: 10px;
  background: rgba(0, 255, 148);
  box-sizing: border-box;
  margin-bottom: 0;
  border: none;
`;
export const PanelItemContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  border: none;
  border-bottom: 1px;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
  border: 0.5px solid #ffffff;
`;
