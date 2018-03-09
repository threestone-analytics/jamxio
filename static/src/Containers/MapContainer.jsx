// MapContainer.js

import React from 'react';
import '../App.css';
import '../Map.css';
import IncidentFeed from '../IncidentFeed';
// import MessageFeed from '../MessageFeed';
import mapboxgl from 'mapbox-gl';
import request from 'request';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXAPIKEY;

// TODO: Add mines porque pesa 25 MB
const dataLayers = [
	{
		type: 'circle',
		name: 'Fuel storage',
		color: '#FF5349',
		filename: 'almacenamiento_refi.geojson'
	},
	{
		type: 'circle',
		name: 'Landfills',
		color: '#292C44',
		filename: 'basureros.geojson'
	},
	{
		type: 'line',
		name: 'Pipe lines',
		color: '#18CDCA',
		filename: 'oleoductos.geojson'
	},
	{
		type: 'fill',
		name: 'Indigenous communities',
		color: '#3F80E1',
		fill: 'rgba(255,196,0, .4)',
		filename: 'poblacion_indigena.geojson.json'
	},
	{
		type: 'circle',
		name: 'Power plants',
		color: '#1FAB9E',
		filename: 'powerplants.geojson'
	},
	{
		type: 'circle',
		name: 'Dams',
		color: '#FAD02F',
		filename: 'presas.geojson'
	},
	{
		type: 'fill',
		name: 'Percent poverty municipality',
		filename: 'poverty.geojson',
		fill: 'rgba(3,39,90, .5)'
	},
	// {
	// 	type: 'circle',
	// 	color: '#3F80E1',
	// 	filename: 'ej_atlas_data.json',
	// 	name: 'Environmental Justice Atlas'
	// },
	{
		type: 'circle',
		name: 'Refineries',
		color: '#F16950',
		filename: 'refinerias.geojson.json'
	}//,
	// {
	// 	type: 'line',
	// 	name: '',
	// 	color: '#F16950',
	// 	filename: 'vias_ferreas.geojson.json'
	// }
];

export default class MapContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			lat: 23.2199952,
			lng: -102.1720662,
			zoom: 6,
			layers: ['Mines', 'Polluted water sources', 'Dams', 'Poverty', 'Indigenous communities', 'Landfills', 'PM2.5', 'Power plants', 'Fuel storage'] // power plants includes refineries
		};
	}
	componentDidMount() {
		const { lng, lat, zoom } = this.state;
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v10',
			center: [lng, lat],
			zoom
		});
		this.map = map;
		map.on('load', () => {
			// return true;
			dataLayers.forEach((datafile) => {
				let layername = datafile.filename.substring(0, datafile.filename.indexOf('.'));
				request('http://localhost:8080/data/' + datafile.filename, (error, response, body) => {
					const opts = {
						id: layername,
						type: datafile.type,
						source: {
							type: 'geojson',
							data: JSON.parse(body)
						},
						layout: {
							visibility: 'none'
						}
					};
					if(datafile.type === "circle") {
						opts.paint = {
							'circle-color': datafile.color,
							'circle-radius': 10
						};
					}
					else if(datafile.type === "fill") {
						opts.paint = {
							'fill-color': datafile.fill
						};
					}
					else if(datafile.type === "line") {
						opts.paint = {
							'line-color': '#e55e5e',
							'line-width': 3
						};
					}
					map.addLayer(opts);
				});
			});
		})

	}
	toggleLayer(key, event) {
		let visibility = this.map.getLayoutProperty(key, 'visibility');
		if(!event.target.checked) {
			this.map.setLayoutProperty(key, 'visibility', 'none');
			// this.className = '';
		} else {
			// this.className = 'active';
			this.map.setLayoutProperty(key, 'visibility', 'visible');
		}
	}
	render() {
		return (
			<section className="MapContainer">
				<div className="container cf">
					<div className="left">
						<div id="map"></div>
					</div>
					<div className="sidebar">
						<section id="FileReport">
							<a href="https://docs.google.com/forms/d/e/1FAIpQLSciJzaDrGzSpt-wrSrBvnq-KRW36TdTrlvJKaEMydIfUVBkcw/viewform?usp=sf_link" target="_blank" className="btn" id="newreport">+ File report</a>
							<a href="https://docs.google.com/spreadsheets/d/1wjHCJ_0B3_kU42iKW32IgEeria27aRVC-G_OHQc4Ves/edit#gid=0" target="_blank" className="datasourceslink" >Data sources</a>
							<hr/>
						</section>
						<section>
							<h2>Data layers</h2>
							<div className="row layers">
								{dataLayers.map((layer, index) => {
									let layername = layer.filename.substring(0, layer.filename.indexOf('.'));

									return (
									<label key={index}>
										<input type="checkbox" onClick={(e) => {this.toggleLayer(layername, e)}} />
										{layer.name}
									</label> );
								})}
							</div>
							<hr/>
						</section>

						<IncidentFeed />
						{/*<MessageFeed />*/}
					</div>
				</div>
			</section>
		)
	}
}

