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
export const CrowdSourcedContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 301px;
  max-width: 320px;
  margin: 20px;
  margin-right: 10%;
  margin-top: 480px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  font-size: 13px;
  line-height: 2;
  color: #000;
  outline: none;
  text-transform: uppercase;
  vertical-align: middle;
`;
export const NewsFeedContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 301px;
  max-width: 320px;
  margin: 20px;
  margin-right: 10%;
  margin-top: 100px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  font-size: 13px;
  line-height: 2;
  color: #000;
  outline: none;
  text-transform: uppercase;
  vertical-align: middle;
`;

export const FeedPanelItemContainer = styled.div`
  width: 100%;
  height: 90px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-bottom: 1px;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
  border: 0.5px solid #ffffff;
`;

export const PictureContainer = styled.div`
  position: relative;
  width: 30%;
  height: 100%;
  display: block;
  padding: 5px;
`;

export const Picture = styled.img`
  position: absolute;
  width: 80%;
  height: 80%;
  background-color: rgba(0, 255, 148);
  display: block;
  padding: 5px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
`;

export const FeedContent = styled.div`
  position: relative;
  width: 70%;
  height: 100%;
`;

export const CheckBox = styled.div`
  width: 10%;
  margin: auto;
`;
export const Label = styled.div`
  width: 90%;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
  padding: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  color: #000000;
  text-align: left;
`;

export const FeedTitle = styled.div`
  width: 90%;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
  padding-top: 10px;
  padding-bottom: 5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  color: #000000;
  text-align: left;
`;

export const TextContent = styled.div`
  width: 90%;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-align: left;
  line-height: normal;
  font-size: 13px;
  color: #000000;
`;
