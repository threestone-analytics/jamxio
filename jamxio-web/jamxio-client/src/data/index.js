// importing GeoJSON files, there is no need to write out the file extension in here, though it is extremly importat to change the actual file extensions from ".geojson" to ".json"

import water from './energy/water';
import pollution from './energy/pollution';
import land from './energy/land';
import industries from './energy/industries';
import waste from './energy/waste';
import twitter from './feed/twitter';

// Schema of a country. In this case Mexico has 54 load zones clustered in 9 balancing areas. Also we have two types of shapes (1.-provided by PRODESEN and 2.- builded by SWITCH team)
let getData = () => ({
  type: 'DataCollection',
  name: 'Data',
  carnita: {
    '00-water': {
      type: 'energy',
      properties: {
        type: 'circle',
        name: 'Water',
        id: '00-storage',
        color: '#FF5349',
        shape: water,
      },
    },
    '01-pollution': {
      type: 'energy',
      properties: {
        type: 'circle',
        name: 'Pollution',
        id: '00-storage',
        color: '#FF5349',
        shape: pollution,
      },
    },
    '02-land': {
      type: 'energy',
      properties: {
        type: 'line',
        name: 'Land',
        color: '#18CDCA',
        shape: land,
      },
    },
    '03-industries': {
      type: 'energy',
      properties: {
        type: 'circle',
        name: 'Industries',
        color: '#1FAB9E',
        shape: industries,
      },
    },
    '04-waste': {
      type: 'energy',
      properties: {
        type: 'circle',
        name: 'Waste',
        color: '#FAD02F',
        shape: waste,
      },
    },
    '05-twitter': {
      type: 'feed',
      properties: {
        type: 'circle',
        name: 'Twitter Feed',
        color: '#32B6DD',
        shape: twitter,
      },
    },
  },
});

export default getData;
