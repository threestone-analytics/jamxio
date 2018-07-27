import React from 'react';
import {
  NewsFeedContainer,
  PanelHeader,
  FeedPanelItemContainer,
  FeedContent,
  PictureContainer,
  TextContent,
  Picture,
  FeedTitle
} from './style';

const NewsPanel = () => (
  <NewsFeedContainer>
    <PanelHeader>Noticias Recientes</PanelHeader>
    <FeedPanelItemContainer>
      <PictureContainer>
        <Picture />
      </PictureContainer>
      <FeedContent>
        <FeedTitle>Christophe Jospe</FeedTitle>
        <TextContent>Mining for carbon: an innovation to environmental haza...</TextContent>
      </FeedContent>
    </FeedPanelItemContainer>
    <FeedPanelItemContainer>
      <PictureContainer>
        <Picture />
      </PictureContainer>
      <FeedContent>
        {' '}
        <FeedTitle>Antonio Guterres</FeedTitle>
        <TextContent>Polution, overfishing and the effects of climate ...</TextContent>
      </FeedContent>
    </FeedPanelItemContainer>
    <FeedPanelItemContainer>
      <PictureContainer>
        <Picture />
      </PictureContainer>
      <FeedContent>
        {' '}
        <FeedTitle>Diana Kane</FeedTitle>
        <TextContent>A water Crisis From Climate Change ...</TextContent>
      </FeedContent>
    </FeedPanelItemContainer>
  </NewsFeedContainer>
);
export default NewsPanel;
