import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Header from '../components/header';
import Nav from '../components/nav';
import Home from '../page/home';
import Zeus from '../page/zeus';
import Ablum from '../page/ablum';

const styles = theme => ({
	root: {
		flexGrow: 1,
		boxShadow:'none'
	},
	paper: {
		padding: '0px',
		textAlign: 'center',
		color: theme.palette.text.secondary,
		boxShadow:'none',
		marginTop:'20px'
	},
});

function CenteredGrid(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<Grid container spacing={0}>
				<Grid item xs={12}>
					<Header />
				</Grid>
				<Grid item xs={2} className={classes.paper}>
					<Nav />
				</Grid>
				<Grid item xs={10} container className={classes.paper} alignItems='stretch'>					
					<Route path='/' exact component={Home}/>
					<Route path='/zeus' component={Zeus}/>
					<Route path='/ablum' component={Ablum}/>
				</Grid>
			</Grid>
		</div>
	);
}
CenteredGrid.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CenteredGrid);
console.log("进入框架渲染",'/src/page/routes.jsx',(new Date()).getMinutes()+":"+(new Date()).getMilliseconds());
