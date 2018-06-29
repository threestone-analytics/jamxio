import React, { PureComponent } from 'react';
import { GeoDataContainer, PanelHeader, PanelItemContainer, CheckBox, Label } from './style';

const categories = ['00-water'];

export default class Panel extends PureComponent {
  render() {
    return (
      <GeoDataContainer>
        <PanelHeader>
          GEO DATA
        </PanelHeader>
        {categories.map((category, index) =>
          <PanelItemContainer key={index}>
            <CheckBox>
            <input
              type="checkbox"
              onClick={e => {
                this.props.toggleLayer('00-water', e);
              }}
            />
            </CheckBox>
            <Label>
            {category}
            </Label>
          </PanelItemContainer>
        )}
      </GeoDataContainer>
    );
  }
}
