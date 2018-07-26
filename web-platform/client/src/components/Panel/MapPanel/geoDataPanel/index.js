import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Dropdown } from '../../../Dropdown';
import { GeoDataContainer, PanelItemContainer, PanelHeader } from './style';

const ShowItem = props => (
  <PanelItemContainer key={props._id}>
    <Dropdown toggleLayer={props.toggleLayer} title={props.title} options={props.options} />
  </PanelItemContainer>
);

ShowItem.propTypes = {
  toggleLayer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired
};

const GeoPanel = props => {
  const array = props.categories;

  const groupedData = _.mapValues(_.groupBy(array, 'documentType.category'), doc =>
    doc.map(e => _.omit(e, 'documentType.category'))
  );

  const categories = [];

  Object.keys(groupedData).forEach(element => {
    categories.push(element);
  });

  return (
    <GeoDataContainer>
      <PanelHeader>Datos geo-espaciales</PanelHeader>
      {categories.map(category => (
        <ShowItem
          toggleLayer={props.toggleLayer}
          title={category}
          options={groupedData[category]}
        />
      ))}
    </GeoDataContainer>
  );
};

GeoPanel.propTypes = {
  categories: PropTypes.array.isRequired,
  toggleLayer: PropTypes.func.isRequired
};

export default GeoPanel;
