import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CatchError extends Component {
  state = {
    hasError: false,
    error: null
  };

  componentDidCatch(error) {
    this.setState({ hasError: true, error });
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;
    if (hasError) {
      if (error) {
        return (
          <div>
            <h1>Something went wrong.</h1>
            <h2>{error}</h2>
          </div>
        );
      }
    }
    return children;
  }
}

CatchError.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
