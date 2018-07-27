import styled from 'styled-components';

export const CheckBox = styled.div`
  width: 10%;
  margin: auto;
`;

export const Item = styled.div`
  height: 40px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  z-index: 97;
`;

export const ItemContainer = styled.div`
  position: relative;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const SubItem = styled.li`
  position: relative;
  background: #fff;
  display: flex;
  padding-left: 15px;
  width: 100%;
  z-index: 99;
  background: ${props => (props.color ? props.color : '10px')};
`;

export const SubItemLabel = styled.div`
  width: 100%;
  color: #fff;
  align-content: flex-start;
  vertical-align: middle;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  text-align: left;
  padding: 10px;
`;

export const SubSubItem = styled.li`
  position: relative;
  background: #fff;
  display: flex;
  padding-left: 35px;
  width: 100%;
  z-index: 999;
`;

export const Label = styled.div`
  width: 90%;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  color: #000000;
  text-align: left;
  padding: ${props => (props.sub ? '0px' : '10px')};
`;

export const ItemLabel = styled.div`
  padding: 0px;
`;

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
