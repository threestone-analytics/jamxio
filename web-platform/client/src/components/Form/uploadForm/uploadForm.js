import React from 'react';
import { Button, ModalButtonBox, DropzoneBox, AlertBox } from './style';
import { Form, FormBox, Title, Alert, FieldBox } from './style';
import { reduxForm, Field } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect';
import Dropzone from '../../../components/Dropzone';
import AlertText from '../../../components/Alert';
import 'react-widgets/dist/css/react-widgets.css';

const subcategories = [
  'Electricity',
  'Hydrocarbons',
  'Renewables',
  'Manufacturing',
  'Sociodemographics',
  'Conservation & Environmental goods ',
  'Justice',
];

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

const renderMultiselect = ({ input, data, valueField, textField }) => (
  <Multiselect
    {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />
);

const UF = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Form>
      <form onSubmit={handleSubmit}>
        <FormBox>
          <Title big>Categoria:</Title>
          <Title big>Agua</Title>
        </FormBox>
        <FormBox>
          <Title>Subcategoria:</Title>
          <Title big>Agua</Title>
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
          <Dropzone {...props} />
        </DropzoneBox>
        <ModalButtonBox>
          <Button cancel="true" onClick={props.handleHide}>
            Salir
          </Button>
          <Button type="submit" disabled={false}>
            Subir
          </Button>
        </ModalButtonBox>
      </form>
    </Form>
  );
};

const UploadForm = reduxForm({
  form: 'uploadForm', // a unique identifier for this form
})(UF);

export default UploadForm;
