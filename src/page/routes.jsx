import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Header from '../components/header';
import Home from '../page/home';
import Zeus from '../page/zeus';
import Ablum from '../page/ablum';
import Bank from '../page/bank';
import BankEmployee from '../page/bank-employee';
import Customer from '../page/customer';
import AddLetterCredit from '../page/customer/add-letter-credit';
import LetterCredit from '../page/letter-credit';
import AllTransactions from '../page/all-transactions';

const styles = theme => ({
	root: {
		flexGrow: 1,
		boxShadow:'none'
	},
	paper: {
		padding: '0px',
		textAlign: 'center',
		color: theme.palette.text.secondary,
		boxShadow:'none'
	},
	paperMar: {
		margin:'0px'
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
				<Grid item xs={12} container className={classes.paper+" "+classes.paperMar} alignItems='stretch'>					
					<Route path='/' exact component={Home}/>
					<Route path='/zeus' component={Zeus}/>
					<Route path='/ablum' component={Ablum}/>
					<Route path='/bank' component={Bank}/>
					<Route path='/bankEmployee' component={BankEmployee}/>
					<Route path='/customer' exact component={Customer} />
					<Route path='/customer/addLetterCredit' component={AddLetterCredit} />
					<Route path='/letterCredit' component={LetterCredit}/>
					<Route path='/allTransactions' component={AllTransactions}/>
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
