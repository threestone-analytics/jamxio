import React, { PureComponent } from 'react';
import { CrowdSourcedContainer, PanelHeader, PanelItemContainer, CheckBox, Label } from './style';

const crowdSourced = ['sms', 'twitter', 'Direct Message'];

export default class Panel extends PureComponent {
  render() {
    return (
      <CrowdSourcedContainer>
        <PanelHeader>
          CrowdSourced
        </PanelHeader>

        {crowdSourced.map((category, index) =>
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
      </CrowdSourcedContainer>
    );
  }
}
