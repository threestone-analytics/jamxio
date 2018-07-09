import React from 'react';
import { Card, Image, Details, Info, Buttons, Button, Label } from './style';
import Download from '@axetroy/react-download';

const DataCard = props => (
  <Card>
    <Image>
      <img alt="" />
    </Image>
    <Details>
      <Info>
        <Label>Categoria: </Label>
        <Label>Subcategoria: </Label>
        <Label>Etiqueta (titulo del layer)</Label>
      </Info>
      <Buttons>
        <Button onClick={() => props.handleOpen('historyModal')}>Historial</Button>
        <Download file="data.json" content="Hi, Nice to meet you">
          <Button>Descargar</Button>
        </Download>
        <Button onClick={() => props.handleOpen('uploadModal')}>Agregar</Button>
      </Buttons>
    </Details>
  </Card>
);

export default DataCard;
