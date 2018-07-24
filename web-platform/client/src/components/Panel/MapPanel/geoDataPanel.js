import React from 'react';
import { GeoDataContainer, PanelHeader, PanelItemContainer, CheckBox, Label } from './style';

const GeoPanel = props => {
  const array = props.categories;
  if (array === undefined || array.length === 0) {
    return <div />;
  }
  return (
    <GeoDataContainer>
      <PanelHeader>Datos Geoespaciales</PanelHeader>
      {props.categories.map(category => (
        <PanelItemContainer key={category.documentType._id}>
          <CheckBox>
            <input
              type="checkbox"
              onClick={e => {
                props.toggleLayer(category.documentType._id, e);
              }}
            />
          </CheckBox>
          <Label>{category.documentType.subcategory}</Label>
        </PanelItemContainer>
      ))}
    </GeoDataContainer>
  );
};
export default GeoPanel;
