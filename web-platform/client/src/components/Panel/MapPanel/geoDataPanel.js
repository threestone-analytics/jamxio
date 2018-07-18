import React from 'react';
import { GeoDataContainer, PanelHeader, PanelItemContainer, CheckBox, Label } from './style';

const categories = ['00-water'];

const GeoPanel = () => (
  <GeoDataContainer>
    <PanelHeader>GEO DATA</PanelHeader>
    {categories.map(category => (
      <PanelItemContainer key={category[0]}>
        <CheckBox>
          <input
            type="checkbox"
            onClick={e => {
              this.props.toggleLayer('00-water', e);
            }}
          />
        </CheckBox>
        <Label>{category}</Label>
      </PanelItemContainer>
    ))}
  </GeoDataContainer>
);
export default GeoPanel;
