import React, { PureComponent } from 'react';


const categories = ['00-water'];

const crowdSourced = ['sms', 'twitter', 'Direct Message'];

const defaultContainer = ({ children }) =>
  <div className="control-panel">
    {children}
  </div>;

export default class StyleControls extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
        <div className="control-panel-title">
          <h5>Geo Data</h5>
        </div>
        <hr />
        {categories.map((category, index) =>
          <label key={index}>
            <input
              type="checkbox"
              onClick={e => {
                this.props.toggleLayer('00-water', e);
              }}
            />
            {category}
          </label>
        )}
        <div className="control-panel-title">
          <h5>Crowd Surced Data</h5>
        </div>
        <hr />
        {crowdSourced.map((cs, index) =>
          <label key={index}>
            <input
              type="checkbox"
              onClick={e => {
                this.props.toggleLayer('00-water', e);
              }}
            />
            {cs}
          </label>
        )}
      </Container>
    );
  }
}
