import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox, Label, Item, ItemContainer, SubItem, SubSubItem, SubItemLabel } from './style';

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

  renderRecords(records) {
    if (!records) {
      return;
    }

    const Record = records.map((record, i) => (
      <SubSubItem>
        <Label onClick={() => this.toggleDropdown()}>{record.recordId}</Label>
        <CheckBox>
          <input type="checkbox" onClick={e => {}} />
        </CheckBox>
      </SubSubItem>
    ));

    return Record;
  }

  renderSubcategories() {
    if (!this.props.options) {
      return;
    }

    const array = this.props.options;
    const groupedData = _.mapValues(_.groupBy(array, 'documentType.subcategory'));
    const subcategories = [];
    Object.keys(groupedData).forEach(element => {
      subcategories.push(element);
    });

    const Subcategory = subcategories.map((subcategory, i) => (
      <div>
        <SubItem>
          <SubItemLabel onClick={() => this.toggleDropdown()}>{subcategory}</SubItemLabel>
          <CheckBox>
            <input
              type="checkbox"
              onClick={e => {
                props.toggleLayer(props._id, e);
              }}
            />
          </CheckBox>
        </SubItem>
        {this.renderRecords(groupedData[subcategory])}
      </div>
    ));

    return Subcategory;
  }

  render() {
    return (
      <ItemContainer>
        <Item>
          <CheckBox>
            <input
              type="checkbox"
              onClick={e => {
                props.toggleLayer(props._id, e);
              }}
            />
          </CheckBox>
          <Label onClick={() => this.toggleDropdown()}>
            {this.props.title} <i className="fa fa-angle-down" aria-hidden="true" />
          </Label>
        </Item>
        <ul
          id="subcategory-list"
          className={`dropdown__list ${this.state.active ? 'dropdown__list--active' : ''}`}
        >
          <ItemContainer>{this.renderSubcategories()}</ItemContainer>
        </ul>
      </ItemContainer>
    );
  }
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};
