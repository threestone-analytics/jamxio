import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox, Label, Item, ItemContainer } from './style';

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

  handleClick(i) {
    this.setState({
      selected: i
    });
  }

  renderOptions() {
    if (!this.props.options) {
      return;
    }

    const ItemList = this.props.options.map((option, i) => (
      <Item>
        <li
          role="presentation"
          onClick={_evt => this.handleClick(i)}
          key={i}
          className={`dropdown__list-item ${
            i === this.state.selected ? 'dropdown__list-item--active' : ''
          }`}
        >
          <CheckBox>
            <input
              type="checkbox"
              onClick={e => {
                this.props.toggleLayer(option.recordId, e);
              }}
            />
          </CheckBox>
          <Label sub onClick={() => this.toggleDropdown()}>
            {option.recordId}
          </Label>
        </li>
      </Item>
    ));
    return ItemList;
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
          <Label
            onMouseEnter={() => this.toggleDropdown()}
            onMouseLeave={() => this.toggleDropdown()}
          >
            {this.props.title} <i className="fa fa-angle-down" aria-hidden="true" />
          </Label>
        </Item>
        <ul
          id="subcategory-list"
          className={`dropdown__list ${this.state.active ? 'dropdown__list--active' : ''}`}
        >
          {this.renderOptions()}
        </ul>
      </ItemContainer>
    );
  }
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};
