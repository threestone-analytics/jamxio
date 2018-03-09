// ReportsView.js

import React from 'react';
import request from 'request';

import './App.css';
import './Map.css';
import './ReportsView.css';
import {Link} from 'react-router-dom';

const sheetURL = "https://sheets.googleapis.com/v4/spreadsheets/1Pr5SJ-EBbWDoQeVKcMuxeKMuX25ZTdKIWppGrkVDgPw/values/Sheet1!A1:J7";
const sheetKEY = process.env.REACT_APP_SHEETSAPIKEY;

export default class ReportsView extends React.Component {
	constructor() {
		super();
		this.state = {
			reports: []
		}
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
			<div className="ReportsView">
				<div className="container cf">
					<div className="left orange">
						<div className="container">
							<h1>Filed Reports</h1>
							<div className="ReportsTableContainer">
								<table className="ReportsTable">
									<thead>
										<tr>
											<th>ID</th>
											<th>Timestamp</th>
											<th>Event type</th>
											<th>Location</th>
											<th>Description</th>
											<th>Status</th>
											<th>Since</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{this.state.reports.map((report, index)=> {
											if(index === 0)
												return (<tr></tr>);
											return (<tr key={'report-'+index}>
												<td>{report[0]}</td>
												<td>{report[1]}</td>
												<td>{report[2]}</td>
												<td>{report[3]}</td>
												<td>{report[4]}</td>
												<td>{report[5]}</td>
												<td>{report[6]}</td>
												<td>{report[7]}</td>
											</tr>)
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className="sidebar orange">
						<section>
							<Link to="/" className="btn white">Back to map</Link>
						</section>
					</div>
				</div>
			</div>
		)
	}
}

