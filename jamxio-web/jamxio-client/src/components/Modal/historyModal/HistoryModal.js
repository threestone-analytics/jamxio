import React from 'react';
import PropTypes from 'prop-types';
import { connectModal } from 'redux-modal';
import Modal from 'react-modal';

/* show, handleHide, message, title */
import {
  Button,
  ModalBox,
  ModalInfo,
  ModalOuter,
  ModalButtonBox,
  ModalLabelBox,
  Title,
  CheckBox,
  Label,
  Date,
  User,
  DataType,
  HistoryContainer,
  HistoryBox,
  HistoryItem,
  HistoryInfoTab,
  HistoryItemContainer,
} from './style';


Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.75)';
Modal.defaultStyles.overlay.zIndex = '999';

Modal.defaultStyles.content = {
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  borderRadius: '4px',
  outline: 'none',
  padding: '20px',
};

const numbers = [1, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4];
const listItems = numbers.map((number) =>
<HistoryItem> 
  <CheckBox/> 
  <Date > On  6/11/2018 </Date>
  <User> alexter42</User>
  <DataType> .geojson </ DataType>
</HistoryItem>
);



const HistoryModal = ({ show, handleHide }) => (
  <Modal isOpen={show} onRequestClose={handleHide} contentLabel="Modal" ariaHideApp={false}>
    <ModalOuter>
      <ModalBox>
        <ModalInfo>
          <ModalLabelBox>
            <Label big>Categoria:</Label>
            <Label thin>Agua</Label>
          </ModalLabelBox>
          <ModalLabelBox>
            <Label>Subcategoria:</Label>
            <Label thin>Dato</Label>
          </ModalLabelBox>
          <ModalLabelBox>
            <Label>Fuente de datos:</Label>
            <Label thin>datos.gob.mx</Label>
          </ModalLabelBox>
        </ModalInfo>
        <HistoryContainer>
          <HistoryBox>
            <HistoryInfoTab>
              <Title>Historial</Title>
              <Title margin_right="10%">DataType</Title>
            </HistoryInfoTab>
            <HistoryItemContainer>{listItems}</HistoryItemContainer>
          </HistoryBox>
        </HistoryContainer>
        <ModalButtonBox>
          <Button cancel="true" onClick={handleHide}>Salir</Button>
          <Button onClick={handleHide}>Descargar</Button>
        </ModalButtonBox>
      </ModalBox>
    </ModalOuter>
  </Modal>
);

HistoryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleHide: PropTypes.func.isRequired,
};

export default connectModal({
  name: 'historyModal',
  getModalState: state => state.get('modal'),
})(HistoryModal);
