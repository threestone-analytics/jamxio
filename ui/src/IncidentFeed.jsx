// IncidentFeed.jsx

import React from 'react';
import request from 'request';
import ReportListItem from './ReportListItem';
import './ReportListItem.css';
import {Link} from 'react-router-dom'


const sheetURL = "https://sheets.googleapis.com/v4/spreadsheets/1Pr5SJ-EBbWDoQeVKcMuxeKMuX25ZTdKIWppGrkVDgPw/values/Sheet1!A1:J7";
const sheetKEY = process.env.REACT_APP_SHEETSAPIKEY;

export default class IncidentFeed extends React.Component {
	constructor() {
		super();
		this.state = {
			reports: []
		};
	}
	componentDidMount() {
		// Get the data from the URL

		request({
			uri: sheetURL,
			qs: {
				key: sheetKEY
			}
		}, (error, response, body) => {

			let res = JSON.parse(body)['values'];
			this.setState({reports: res});
		});
	}
	render() {
		return (
			<section className="IncidentFeed">
				<h2>Incident Feed</h2>
				<div className="ReportsContainer">
					<ul className="ReportsList">
						{this.state.reports.map((report, index) => {
							if(index === 0)
								return <li key={index}></li>;
							return (<ReportListItem key={'report-'+index} data={report} />)
						})}
					</ul>
				</div>
				<a href="http://localhost:8080/data/summary.pdf" target="_blank" className="btn download downloaddata">Download Report</a>
				<a href="https://docs.google.com/spreadsheets/d/1Pr5SJ-EBbWDoQeVKcMuxeKMuX25ZTdKIWppGrkVDgPw/edit?usp=sharing"  target="_blank" className="btn download downloadpdf">Download Data</a>
				
				<Link to="/reports" className="seemorelink">View all</Link>
				<hr/>
			</section>
		);
	}
}

