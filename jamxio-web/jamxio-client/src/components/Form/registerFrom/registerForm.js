import React from 'react';
import { Button, ModalButtonBox, DropzoneBox,  AlertBox, RegisterButton, ItemBox } from './style';
import { Form, FormBox, Label, Alert, FieldBox } from './style'; 
import { reduxForm, Field} from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect';
import Dropzone from '../../../components/Dropzone';
import AlertText from '../../../components/Alert';
import 'react-widgets/dist/css/react-widgets.css'
// FIXME refactor this

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


let LoginForm = props => {

  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Form>
      <form onSubmit={handleSubmit}>
      <FormBox>
        <ItemBox>
          <Label>Nombre:</Label>
          <FieldBox>
            <Field
                name="subcategory"
                component={renderMultiselect}
                data={subcategories}
                />               
          </FieldBox>
        </ItemBox>
        <ItemBox>
          <Label>e-mail:</Label>
          <FieldBox>
            <Field
                name="source"
                component={renderDropdownList}
                data={sources}
                valueField="value"
                textField="source"
              /> 
          </FieldBox>
        </ItemBox>
        <ItemBox>
          <Label>Institucion:</Label>
          <FieldBox>
            <Field
                name="source"
                component={renderDropdownList}
                data={sources}
                valueField="value"
                textField="source"
              /> 
          </FieldBox>
        </ItemBox>
        <ItemBox>
          <Label>Tipo de Institucion:</Label>
          <FieldBox>
            <Field
                name="source"
                component={renderDropdownList}
                data={sources}
                valueField="value"
                textField="source"
              /> 
          </FieldBox>
        </ItemBox>
        </FormBox>
        <FormBox>
        <ItemBox>
          <Label>Usuario:</Label>
          <FieldBox>
            <Field
                name="subcategory"
                component={renderMultiselect}
                data={subcategories}
                />               
          </FieldBox>
        </ItemBox>
        <ItemBox>
          <Label>Contrasena:</Label>
          <FieldBox>
            <Field
                name="source"
                component={renderDropdownList}
                data={sources}
                valueField="value"
                textField="source"
              /> 
          </FieldBox>
        </ItemBox>
        </FormBox>
        <ModalButtonBox>
          <Button onClick={props.handleHide}>ENTRAR</Button>
        </ModalButtonBox>
      </form>
    </Form>
  );
};

LoginForm = reduxForm({
  form: 'loginForm', // a unique identifier for this form
})(LoginForm);

export default LoginForm;
