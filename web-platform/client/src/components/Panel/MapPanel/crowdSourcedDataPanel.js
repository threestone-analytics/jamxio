import React from 'react';
import { CrowdSourcedContainer, PanelHeader, PanelItemContainer, CheckBox, Label } from './style';

const crowdSourced = ['sms', 'twitter', 'Direct Message'];

const CrowdSourcedPanel = props => (
  <CrowdSourcedContainer>
    <PanelHeader>Reportes en linea</PanelHeader>

    {crowdSourced.map(category => (
      <PanelItemContainer key={category[0]}>
        <CheckBox>
          <input
            type="checkbox"
            onClick={e => {
              props.toggleLayer('00-water', e);
            }}
          />
        </CheckBox>
        <Label>{category}</Label>
      </PanelItemContainer>
    ))}
  </CrowdSourcedContainer>
);

export default CrowdSourcedPanel;
