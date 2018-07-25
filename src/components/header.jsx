import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import navStyles from './nav.css';
const styles = {
	root: {
		flexGrow: 1,
		padding:'0px',

	},
	flex: {
		flex: 1,
	},
	headerStyle: {
		boxShadow:'none',
		borderBottom:'1px solid #fff'
	}
};

function ButtonAppBar(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.headerStyle}>
				<Toolbar>
					<Typography variant="title" color="inherit" className={classes.flex}>
						Title
					</Typography>
					<Button color="inherit">Login</Button>
					<span>LOGO</span>
				</Toolbar>
				<Toolbar className={navStyles['lss-nav-toolbar']}>
					<NavLink to={'/bank'} exact activeClassName={navStyles['lss-nav-selected']}>银行机构</NavLink>
					<NavLink to={'/bankEmployee'} exact activeClassName={navStyles['lss-nav-selected']}>银行柜员</NavLink>
					<NavLink to={'/customer'} exact activeClassName={navStyles['lss-nav-selected']}>客户</NavLink>
					<NavLink to={'/letterCredit'} exact activeClassName={navStyles['lss-nav-selected']}>信用证</NavLink>
					<NavLink to={'/allTransactions'} exact activeClassName={navStyles['lss-nav-selected']}>所有交易</NavLink>
				</Toolbar>
			</AppBar>
		</div>
	);
}

ButtonAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
