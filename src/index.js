import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './page/routes';
import {Provider} from 'react-redux';
import {store} from './store';
import {BrowserRouter, Route} from 'react-router-dom';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Route path='/' component={Routes}/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('lss')
);
console.log("进入UI渲染",'/src/index.js',(new Date()).getMinutes()+":"+(new Date()).getMilliseconds());