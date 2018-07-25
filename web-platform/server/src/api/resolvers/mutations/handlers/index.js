import L from 'leaflet-headless';

export const saveMap = function(geometry) {
  const map = L.map(document.createElement('div')).setView([23.8, -102.1], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap Sweden',
  }).addTo(map);

  const geojson = L.geoJson(geometry, {
    fillColor: 'red',
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  });

  geojson.addTo(map);
  map.setSize(900, 500);
  map.saveImage('test.png', function(filename) {
    console.log('Saved map image to ' + filename);
  });
};
