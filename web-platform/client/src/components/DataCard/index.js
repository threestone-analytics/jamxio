import React from 'react';
import Download from '@axetroy/react-download';
import geojsonToImage from 'geojson-to-image';
import { Card, Image, Details, Info, Buttons, Button, Label } from './style';

const DataCard = props => {
  const data = props.data.document;
  const geometry = JSON.stringify(data.geometry, null, 2);
  // console.log(data);

  // const image = geojsonToImage({
  //   'mapID': 'username.mapid',
  //   'accessToken': process.env.MAPBOX_TOKEN,
  // }, geojson);
  console.log(props)
  const handleOpen = name => {
    props.actions.show(name, { data: data });
  };
  return (
    <Card>
      <Image>
        <img alt="image" />
      </Image>
      <Details>
        <Info>
          <Label>Categoria: {data.documentType.category}</Label>
          <Label>Subcategoria: {data.documentType.subcategory}</Label>
          <Label>{data.title}</Label>
        </Info>
        <Buttons>
          <Button onClick={() => handleOpen('historyModal')}>Historial</Button>
          <Download file="data.json" content={geometry}>
            <Button>Descargar</Button>
          </Download>
          <Button onClick={() => handleOpen('uploadModal')}>Agregar</Button>
        </Buttons>
      </Details>
    </Card>
  );
};

export default DataCard;
