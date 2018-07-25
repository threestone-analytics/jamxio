import React from 'react';
import PropTypes from 'prop-types';
import { connectModal } from 'redux-modal';
import Modal from 'react-modal';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { SyncLoader } from 'react-spinners';
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
  SpinnerBox,
  DataType,
  HistoryContainer,
  HistoryBox,
  HistoryItem,
  HistoryInfoTab,
  HistoryItemContainer
} from './style';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.75)';
Modal.defaultStyles.overlay.zIndex = '999';

Modal.defaultStyles.content = {
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  borderRadius: '4px',
  outline: 'none',
  padding: '20px'
};

const GET_DOCUMENTS = gql`
  query($_id: ID!) {
    getRecordById(_id: $_id) {
      title
      documents {
        _id
        source
        url
        documentType {
          _id
          category
          subcategory
        }
        publishedDate
      }
    }
  }
`;

const Items = ({ _id }) => (
  <Query pollInterval={500} query={GET_DOCUMENTS} variables={{ _id }}>
    {({ loading, error, data }) => {
      if (loading)
        return (
          <SpinnerBox>
            <SyncLoader color="#2F80ED" />
          </SpinnerBox>
        );
      if (error) return `Error! ${error.message}`;
      return data.getRecordById.documents.map(d => {
        const timestamp = d.publishedDate.toString();
        const date = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(timestamp);
        return (
          <HistoryItem key={d._id}>
            <CheckBox />
            <Date> On {date} </Date>
            <User> alexter42</User>
            <DataType> {d.source} </DataType>
          </HistoryItem>
        );
      });
    }}
  </Query>
);

Items.propTypes = {
  _id: PropTypes.string.isRequired
};

const HistoryModal = props => (
  <Modal
    isOpen={props.show}
    onRequestClose={props.handleHide}
    contentLabel="Modal"
    ariaHideApp={false}
  >
    <ModalOuter>
      <ModalBox>
        <ModalInfo>
          <ModalLabelBox>
            <Label big>Categoria:</Label>
            <Label thin>{props.record.documentType.category}</Label>
          </ModalLabelBox>
          <ModalLabelBox>
            <Label>Subcategoria:</Label>
            <Label thin>{props.record.documentType.subcategory}</Label>
          </ModalLabelBox>
          <ModalLabelBox>
            <Label>Titulo:</Label>
            <Label thin>{props.record.title}</Label>
          </ModalLabelBox>
        </ModalInfo>
        <HistoryContainer>
          <HistoryBox>
            <HistoryInfoTab>
              <Title>Historial</Title>
              <Title margin_right="10%">Fuente</Title>
            </HistoryInfoTab>
            <HistoryItemContainer>
              <Items _id={props.record._id} />
            </HistoryItemContainer>
          </HistoryBox>
        </HistoryContainer>
        <ModalButtonBox>
          <Button cancel="true" onClick={props.handleHide}>
            Salir
          </Button>
          <Button onClick={props.handleHide}>Descargar</Button>
        </ModalButtonBox>
      </ModalBox>
    </ModalOuter>
  </Modal>
);

HistoryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired
};

export default connectModal({
  name: 'historyModal',
  getModalState: state => state.get('modal')
})(HistoryModal);
