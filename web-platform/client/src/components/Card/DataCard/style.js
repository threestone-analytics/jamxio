import styled from 'styled-components';

export const Card = styled.div`
  z-index: 0;
  position: relative;
  display: flex;
  flex-direction: row;
  height: 230px;
  background-color: #fff;
  border: 1px solid #cfd8dc;
  width: 80%;
  padding: 20 20 20 20;
  margin: auto auto;
  margin-top: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Image = styled.div`
  order: 0;
  margin: auto;
  margin-top: 15px;
  height: 87%;
  margin-left: 15px;
  background-color: #000;
  width: 28%;
`;

export const Details = styled.div`
  order: 1;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  height: 87%;
  left: 15px;
  background-color: white;
  width: 65%;
`;

export const Info = styled.div`
  order: 0;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 15px;
  height: 60%;
  left: 15px;
  background-color: white;
  width: 65%;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 18px;
`;

export const LabelBox = styled.div`
  order: 0;
  display: flex;
  flex-direction: row;
  text-align: left;
  margin-top: 15px;
  height: 40%;
  left: 15px;
  background-color: white;
  width: 100%;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 18px;
  color: #2f80ed;
`;

export const Label = styled.div`
  font-size: 18px;
  font-weight: normal;
  color: #000;
  margin-left: 10px;
`;

export const Buttons = styled.div`
  order: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  height: 20%;
  left: 0;
  background-color: white;
  width: 50%;
`;

export const Button = styled.button`
  background: #ffffff;
  width: 150px;
  border: 2px solid rgb(0, 255, 148);
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  outline: none;
  color: #2f80ed;
  font-style: normal;
  height: 30px;
  margin-top: 15px;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
`;
