import React from 'react';
import PropTypes from 'prop-types';
import 'react-widgets/dist/css/react-widgets.css';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Dropzone from '../../../components/Dropzone';

import {
  Button,
  ModalButtonBox,
  DropzoneBox,
  AlertBox,
  Form,
  FormBox,
  Title,
  Alert,
  FieldBox,
} from './style';
import AlertText from '../../../components/Alert';

import { validate, createRecord } from './validate';

// Actions
import * as alertActions from '../../../redux/reducers/alert/alertActions';
import * as dropzoneActions from '../../../redux/reducers/dropzone/dropzoneActions';
import * as validateActions from '../../../redux/reducers/form/validateFileForm/validateActions';

// Selectors
import { getDropzone } from '../../../utils/selectors/common';

const actions = [alertActions, dropzoneActions, validateActions];

function mapStateToProps(state) {
  return {
    dropzone: getDropzone(state),
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  };
}

const sources = [
  'SENER',
  'SEGOB',
  'IMMEX',
  'SE',
  'Cartocritica',
  'EIMM',
  'SE',
  'GeoComunes',
  'CONABIO',
  'CONANP',
  'datamxio',
  'RAN',
  'SINAICA',
  'SINEA',
  'CONAPRED',
  'INECC',
  'CONAPO',
  'CDI',
  'COFEPRIS',
  'SEMARNAT',
  'INEGI',
];

const renderDropdownList = ({ input, data, valueField, textField }) => (
  <DropdownList
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}
  />
);

const dropzone = ({ input, data, valueField, textField, actions, change }) => (
  <Dropzone
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}
    actions={actions}
    change={change}
  />
);

const handleRecord = async (props, document) => {
  await props.handleAddRecord(document);
};
const UF = props => {
  const handleSubmit = () => {
    const formData = props.forms.uploadForm;
    const document = createRecord(formData, props.record);
    handleRecord(props, document);
    props.handleHide();
  };
  console.log(props)
  return (
    <Form>
      <form onSubmit={handleSubmit}>
        <FormBox>
          <Title big>Categoria:</Title>
          <Title big>{props.record.documentType.category}</Title>
        </FormBox>
        <FormBox>
          <Title>Subcategoria:</Title>
          <Title big>{props.record.documentType.subcategory}</Title>
        </FormBox>
        <FormBox>
          <Title>Titulo:</Title>
          <Title big>{props.record.title}</Title>
        </FormBox>
        <FormBox>
          <Title>Fuente de los datos:</Title>
          <FieldBox>
            <Field
              name="source"
              component={renderDropdownList}
              data={sources}
              valueField="value"
              textField="source"
            />
          </FieldBox>
        </FormBox>
        <AlertBox>
          <Alert blue>Descarga el esquema de datos</Alert>
          <AlertText {...props} />
        </AlertBox>
        <DropzoneBox>
          <Field
            name="geometry"
            component={dropzone}
            data={sources}
            valueField="value"
            textField="geometry"
            actions={props.actions}
            change={props.change}
          />
        </DropzoneBox>
      </form>
      <ModalButtonBox>
        <Button cancel="true" onClick={props.handleHide}>
          Salir
        </Button>
        <Button onClick={handleSubmit} disabled={!props.valid}>
          Subir
        </Button>
      </ModalButtonBox>
    </Form>
  );
};

const UFD = reduxForm({
  form: 'uploadForm',
  validate,
})(UF);

const UploadForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UFD);

export default UploadForm;
