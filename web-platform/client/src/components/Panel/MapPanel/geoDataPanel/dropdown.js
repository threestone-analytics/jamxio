import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox, Label, Item, ItemContainer, SubItem, SubSubItem, SubItemLabel } from './style';
import { layerColor } from '../../../../styles/app/map/layers';

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.initial || -1
    };
  }

  toggleDropdown() {
    this.setState({
      active: !this.state.active
    });
  }

  closeDropdown() {
    this.setState({
      active: false
    });
  }

  openDropdown() {
    this.setState({
      active: true
    });
  }

  handleClick(i) {
    this.setState({
      selected: i
    });
  }

  renderRecords(records, color) {
    if (!records) {
      return;
    }

    const Record = records.map((record, i) => {
      const _id = record.recordId;
      console.log(color);
      return (
        <SubSubItem>
          <Label onClick={() => this.toggleDropdown()}>{_id}</Label>
          <CheckBox>
            <input
              type="checkbox"
              onClick={e => {
                this.props.toggleLayer(_id, e);
              }}
            />
          </CheckBox>
        </SubSubItem>
      );
    });

    return Record;
  }

  renderSubcategories(category) {
    if (!this.props.options) {
      return;
    }
    const color = layerColor.category[category];
    const array = this.props.options;
    const groupedData = _.mapValues(_.groupBy(array, 'documentType.subcategory'));
    const subcategories = [];
    Object.keys(groupedData).forEach(element => {
      subcategories.push(element);
    });

    const Subcategory = subcategories.map((subcategory, i) => (
      // console.log(subcategory);
      <div>
        <SubItem color={color}>
          <SubItemLabel onClick={() => this.toggleDropdown()}>{subcategory}</SubItemLabel>
        </SubItem>
        {this.renderRecords(groupedData[subcategory], color)}
      </div>
    ));

    return Subcategory;
  }

  render() {
    return (
      <ItemContainer>
        <Item>
          <Label onClick={() => this.toggleDropdown()}>{this.props.title}</Label>
        </Item>
        <ul
          id="subcategory-list"
          className={`dropdown__list ${this.state.active ? 'dropdown__list--active' : ''}`}
        >
          <ItemContainer>{this.renderSubcategories(this.props.title)}</ItemContainer>
        </ul>
      </ItemContainer>
    );
  }
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};
