import React from 'react';
import Download from '@axetroy/react-download';
import geojsonToImage from 'geojson-to-image';
import { Card, Image, Details, Info, Buttons, Button, LabelBox, Label } from './style';

const DataCard = props => {
  const record = props.record;
  const handleOpen = name => {
    props.actions.show(name, { record });
  };
  return (
    <Card>
      <Image>
        <img alt="image" />
      </Image>
      <Details>
        <Info>
          <LabelBox>
            Categoria: <Label> {record.documentType.category}</Label>
          </LabelBox>
          <LabelBox>
            Subcategoria: <Label> {record.documentType.subcategory}</Label>
          </LabelBox>
          <LabelBox>
            Titulo: <Label> {record.title}</Label>
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
