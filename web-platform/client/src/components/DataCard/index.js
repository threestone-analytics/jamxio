import React from 'react';
import { Card, Image, Details, Info, Buttons, Button, Label } from './style';
import Download from '@axetroy/react-download';

const DataCard = props => {
  const data = props.data.document;
  return (
    <Card>
      <Image>
        <img alt="" />
      </Image>
      <Details>
        <Info>
          <Label>Categoria: {data.documentType.category}</Label>
          <Label>Subcategoria: {data.documentType.subcategory}</Label>
          <Label>{data.title}</Label>
        </Info>
        <Buttons>
          <Button onClick={() => props.handleOpen('historyModal')}>Historial</Button>
          <Download file="data.json" content={data.geometry}>
            <Button>Descargar</Button>
          </Download>
          <Button onClick={() => props.handleOpen('uploadModal')}>Agregar</Button>
        </Buttons>
      </Details>
    </Card>
  );
};

export default DataCard;
