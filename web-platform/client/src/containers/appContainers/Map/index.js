import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { layerColor } from '../../../styles/app/map/layers';

import GeoDataPanel from '../../../components/Panel/MapPanel/geoDataPanel';
import CrowdSourcedDataPanel from '../../../components/Panel/MapPanel/crowdSourcedDataPanel';
import NewsFeedPanel from '../../../components/Panel/MapPanel/newsFeedPanel';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

async function plotData(docs, m) {
  docs.map(async (doc, i) => {
    const { url } = doc;
    const color = layerColor.category[doc.documentType.category][i];
    m.addSource(doc.recordId, {
      type: 'geojson',
      data: url
    });
    m.addLayer({
      type: 'fill',
      paint: { 'fill-color': color },
      layout: {
        visibility: 'none'
      },
      id: doc.recordId, // Sets id as current child's key
      source: doc.recordId // The source layer defined above
    });
  });
}

class MapContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      lat: 23.3704762,
      lng: -91.7996812,
      zoom: 4.5
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [lng, lat],
      width: this.props.width || window.innerWidth,
      height: this.props.height || window.innerHeight,
      zoom
    });
    this.map = map;
    const a = this.map;
    if (this.props.data.getLatestDocuments) {
      const datos = this.props.data.getLatestDocuments;
      this.setState({ categories: datos });
      map.on('load', () => {
        plotData(datos, a);
      });
    }
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
        <GeoDataPanel
          categories={this.state.categories}
          toggleLayer={this.toggleLayer.bind(this)}
        />
        <CrowdSourcedDataPanel toggleLayer={this.toggleLayer.bind(this)} />
        <NewsFeedPanel toggleLayer={this.toggleLayer.bind(this)} />
      </div>
    );
  }
}

const GET_DOCUMENTS = gql`
  query {
    getLatestDocuments {
      documentType {
        _id
        category
        subcategory
      }
      source
      recordId
      url
    }
  }
`;

export default compose(
  graphql(GET_DOCUMENTS, {
    options: () => ({
      pollInterval: '500'
    })
  })
)(MapContainer);

MapContainer.propTypes = {
  width: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  height: PropTypes.object.isRequired
};
