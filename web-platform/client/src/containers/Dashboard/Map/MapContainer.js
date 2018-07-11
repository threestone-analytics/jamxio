// MapContainer.js

import React from 'react';

import mapboxgl from 'mapbox-gl';

import GeoDataPanel from '../../../components/Panel/MapPanel/geoDataPanel';
import CrowdSourcedDataPanel from '../../../components/Panel/MapPanel/crowdSourcedDataPanel';
import NewsFeedPanel from '../../../components/Panel/MapPanel/newsFeedPanel';

const DATA_URL =
  'https://raw.githubusercontent.com/Switch-Mexico/switch-gui/master/src/imports/ui/data/balancing_areas/switch/b_a_05.json'; // eslint-disable-line
mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

export default class MapContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      lat: 23.2199952,
      lng: -102.1720662,
      zoom: 4.5,
      layers: ['Water', 'Pollution', 'Land'],
    };
    fetch(DATA_URL)
      .then(resp => resp.json())
      .then(data => this.setState({ data }));
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      width: this.props.width || window.innerWidth,
      height: this.props.height || window.innerHeight,
      zoom,
    });
    this.map = map;

    map.on('load', () => {
      // return true;

      const opts = {
        id: '00-water',
        type: 'fill',
        source: {
          type: 'geojson',
          data: this.state.data,
        },
        layout: {
          visibility: 'none',
        },
      };
      map.addLayer(opts);
    });
  }
  toggleLayer(key, event) {
    if (!event.target.checked) {
      this.map.setLayoutProperty(key, 'visibility', 'none');
      // this.className = '';
    } else {
      // this.className = 'active';
      this.map.setLayoutProperty(key, 'visibility', 'visible');
    }
  }
  render() {
    return (
      <div style={{ height: `${100}%`, width: `${100}%` }}>
        <div id="map" style={{ height: `100vh`, width: `100vw` }} />
        <GeoDataPanel toggleLayer={this.toggleLayer.bind(this)} />
        <CrowdSourcedDataPanel toggleLayer={this.toggleLayer.bind(this)} />
        <NewsFeedPanel toggleLayer={this.toggleLayer.bind(this)} />
      </div>
    );
  }
}
