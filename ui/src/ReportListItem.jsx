import React from 'react';
import './ReportListItem.css';

export default class ReportListItem extends React.Component {
	getIcon(alpha) {
		let icons = {
			'Nuclear waste': 'icon',
			'Mining': 'icon',
			'Waste Management (e.g,landfills, superfund sites, pollution burning)': 'icon',
			'Biomass and land conflicts (e.g, including deforestation and land grabs)': 'icon',
			'Air pollution (e.g,power plant emissions, refineries, disproportionate transportation emissions)': 'icon',
			'Water pollution': 'icon',
			'Infrastructure projects (e.g, oil and gas pipelines)': 'icon',
			'Industrial belts (e.g, hazardous companies)': 'icon',
			'Damage to basic services infrastructure (e.g, leaking water)': 'icon',
			'Use of Hazardous materials (e.g, pesticides, lead in paint, known carcinogenics)': 'icon',
		};
		return icons[alpha];
	}
	render() {
		let data = this.props.data;

		return(
			<li className="ReportListItem">
				<p className="location">{data[3]}</p>
				<h4 className="title"><i className="ico">{this.getIcon(data[2])}</i> {data[4].substring(0, 50)} <span className="date">{data[0]}</span></h4>
				<p className="desc">{data[4].substring(0, 150)}...</p>
			</li>
		);
	}
}
