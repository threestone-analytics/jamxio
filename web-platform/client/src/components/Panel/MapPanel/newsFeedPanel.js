import React from 'react';
import { NewsFeedContainer, PanelHeader, PanelItemContainer, Label } from './style';

const categories = ['00-water'];

const NewsPanel = () => (
  <NewsFeedContainer>
    <PanelHeader>NEWS FEED</PanelHeader>
    {categories.map(category => (
      <PanelItemContainer key={category[0]}>
        <Label>{category}</Label>
      </PanelItemContainer>
    ))}
  </NewsFeedContainer>
);
export default NewsPanel;
