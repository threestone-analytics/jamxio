import styled from 'styled-components';

export const ExitButton = styled.button`
  width: 59px;
  height: 45px;
  text-align: center;
  line-height: 70px;
  background:none;
  border: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 36px;
  text-align: center;
  color: #FFFFFF;
  margin: auto;
`;

export const Input = styled.input`
  order: 1;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 24px;
  color: #000000;
  margin: 15px;

`;

export const ModalBox = styled.div`
  width: 722px;
  height: 581px;
  left: 261px;
  top: 263px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  width: 100%;
  height: 119px;
  top: 0;
  background: #2F80ED;
  display: flex;
  flex-direction: row;
`;


export const ModalTitleBox = styled.div`
  background-color: white;
  order: 0;
  margin-left: 15%;
  height: 30%;
  width: 60%;
  display: flex;
  flex-direction: ${props => (props.vertical ? 'column' : 'row')};
`;

export const ModalButtonBox = styled.div`
  background-color: white;
  order: 2;
  height: 10%;
  width: 60%;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: space-around;
`;

export const ModalOuter = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalInfo = styled.div`
  background-color: white;
  padding: auto;
  order: 0;
  height: 25%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  align-content: space-between;
  margin-top: 30px;
`;

export const AlertBox = styled.div`
  background-color: white;
  order: 2;
  margin-left: 15%;
  height: 10%;
  width: 60%;
  display: flex;
  flex-direction: ${props => (props.vertical ? 'column' : 'row')};
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  font-size: 64px;
  width: 60%;
  margin-left: 20%;
  text-align: center;
  color: #FFFFFF;
  padding: 20px 0;
`;
export const Alert = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 'bold';
  font-size: 15px;
  color: ${props => (props.red ? '#ff0000' : '#0000ff')};
  margin: 10px;
  text-decoration: ${props => (props.blue ? 'underline' : 'none')};
`;

export const HistoryContainer = styled.div`
  background-color: white;
  order: 2;
  height: 60%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HistoryBox = styled.div`
  background-color: white;
  order: 2;
  height: 100%;
  width: 70%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const HistoryInfoTab = styled.div`
  background-color: white;
  order: 0;
  bottom: 0;
  margin-top: 3%;
  height: 7%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(120, 103, 103, 0.51);
`;

export const HistoryItemContainer = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(120, 103, 103, 0.51);
  flex-direction: column;
  overflow: auto;
`;

export const HistoryItem = styled.div`
  background-color: white;
  order: 0;
  bottom: 0;
  margin-top: 20px;
  height: 37px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(120, 103, 103, 0.11);
`;

export const HistoryItemBox = styled.div`
  background-color: white;
  height: 100%;
  width: ${props => (props.width ? props.width : '10%')};
  display: flex;
  justify-content: flex-start;
  vertical-align: middle;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 14px;
  color: #000000;
`;

export const DropzoneBox = styled.div`
  width: 100%;
  order: 1;
  height: 30%;
  left: 15px;
`;
