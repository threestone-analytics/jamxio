import React from 'react';
/* show, handleHide, message, title */
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { renderSubcategories } from './handlers';

// Actions
import * as dropdownActions from '../../store/reducers/dropdown/dropdownActions';
import { Label, Item, ItemContainer } from './style';

// Selectors
import { getDropdown } from '../../utils/selectors/common';

function mapStateToProps(state) {
  return {
    dropdownState: getDropdown(state)
  };
}

const actions = [dropdownActions];

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

const DD = props => {
  let active = false;
  if (props.dropdownState[props.title] && props.dropdownState[props.title].show) {
    active = props.dropdownState[props.title].show;
  }
  return (
    <ItemContainer>
      <Item>
        <Label
          onClick={() => {
            props.actions.toggleItems(props.title);
          }}
        >
          {props.title}
        </Label>
      </Item>
      <ul
        id="subcategory-list"
        className={`dropdown__list ${active ? 'dropdown__list--active' : ''}`}
      >
        <ItemContainer>{renderSubcategories(props)}</ItemContainer>
      </ul>
    </ItemContainer>
  );
};

export const Dropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(DD);

DD.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  dropdownState: PropTypes.object.isRequired
};
