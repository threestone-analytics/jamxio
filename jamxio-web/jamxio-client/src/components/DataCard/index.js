import React from 'react';
import { Card, Image, Details, Info, Buttons, Button, Label } from './style';
import Download from '@axetroy/react-download';

const content = JSON.stringify({"Saludo":"Hi, Nice to meet you"});

const DataCard = props => {
  return (
    <Card>
      <Image>
        <img alt="" />
      </Image>
      <Details>
        <Info>
        <Label>Categoria:</Label>
        <Label>Formato de archivo:</Label>
        <Label>Fuente:</Label>
        </Info>
        <Buttons>
          <Button onClick={() => props.handleOpen('historyModal')}>Historial</Button>
          <Download file="data.json" content={content}>
            <Button>Descargar</Button>
          </Download>
          <Button onClick={() => props.handleOpen('uploadModal')}>Agregar</Button>
        </Buttons>
      </Details>
    </Card>
  );
};

export default DataCard;
