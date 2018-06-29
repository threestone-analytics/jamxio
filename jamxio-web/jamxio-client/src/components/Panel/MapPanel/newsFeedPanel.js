import React, { PureComponent } from 'react';
import { NewsFeedContainer, PanelHeader, PanelItemContainer, Label} from './style';
const categories = ['00-water'];

export default class StyleControls extends PureComponent {
  render() {

    return (
      <NewsFeedContainer>
        <PanelHeader>
          NEWS FEED
        </PanelHeader>
        {categories.map((category, index) =>
          <PanelItemContainer key={index}>
            <Label>
              {category}
            </Label>
          </PanelItemContainer>
        )}
      </NewsFeedContainer>
    );
  }
}
