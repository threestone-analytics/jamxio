import React from 'react';
import { CheckBox, Label, SubItem, SubSubItem, SubItemLabel } from './style';
import { layerColor } from '../../styles/app/map/layers';

export const renderRecords = function(records, toggleLayer) {
  if (!records) {
    return;
  }

  const data = records.map(record => {
    const _id = record.recordId;
    return (
      <SubSubItem>
        <Label onClick={() => console.log('toggleDropdown()')}>{_id}</Label>
        <CheckBox>
          <input
            type="checkbox"
            onClick={e => {
              toggleLayer(_id, e);
            }}
          />
        </CheckBox>
      </SubSubItem>
    );
  });

  return data; // eslint-disable-line
};

export const renderSubcategories = function(props) {
  const category = props.title;
  console.log(props, 'subcategories options', category);
  if (!props) {
    return;
  }
  const color = layerColor.category[category];
    const groupedData = _.mapValues(_.groupBy(props.options, 'documentType.subcategory'));// eslint-disable-line
  const subcategories = [];
  Object.keys(groupedData).forEach(element => {
    subcategories.push(element);
  });

  const data = subcategories.map((subcategory, i) => (
    <div>
      <SubItem color={color[i]}>
        <SubItemLabel onClick={() => console.log('toggleDropdown()')}>{subcategory}</SubItemLabel>
      </SubItem>
      {renderRecords(groupedData[subcategory], color)}
    </div>
  ));

    return data;  // eslint-disable-line
};
