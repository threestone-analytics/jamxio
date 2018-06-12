import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReportsView from './ReportsView';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'


// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
	<Router>
		<Switch>
			<Route exact path="/" component={App}></Route>
			<Route path="/reports" component={ReportsView}></Route>
		</Switch>
	</Router>
	), document.getElementById('root'));
// registerServiceWorker();
