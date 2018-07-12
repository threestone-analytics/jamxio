import React from 'react';
import Download from '@axetroy/react-download';
import geojsonToImage from 'geojson-to-image';
import { Card, Image, Details, Info, Buttons, Button, LabelBox, Label } from './style';

const DataCard = props => {
  const data  = props.data;
  const handleOpen = name => {
    props.actions.show(name, { data });
  };
  return (
    <Card>
      <Image>
        <img alt="image" />
      </Image>
      <Details>
        <Info>
          <LabelBox>
            Categoria: <Label> {data.category}</Label>
          </LabelBox>
          <LabelBox>
            Subcategoria: <Label> {data.subcategory}</Label>
          </LabelBox>
          <LabelBox>
            Titulo: <Label> {data.title}</Label>
          </LabelBox>
        </Info>
        <Buttons>
          <Button onClick={() => handleOpen('historyModal')}>Historial</Button>
          <Download file="data.json" content={"geometry"}>
            <Button>Descargar</Button>
          </Download>
          <Button onClick={() => handleOpen('uploadModal')}>Contribuir</Button>
        </Buttons>
      </Details>
    </Card>
  );
};

export default DataCard;
