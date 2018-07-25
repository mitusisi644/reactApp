import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import navStyles from './nav.css';
const styles = theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		padding:'0px'
	},
	navs: {
		padding:'0px',
	}
});

function ListDividers(props) {
	const { classes } = props;
	return (

		<div className={classes.root}>
			<List component="nav" className={classes.navs}>
				<ListItem className={navStyles['lss-nav']} button divider>
					<NavLink to={'/bank'} exact activeClassName={navStyles['lss-nav-selected']}><ListItemText primary="银行机构"  /></NavLink>
				</ListItem>
				<ListItem className={navStyles['lss-nav']} button divider>
					<NavLink to={'/bankEmployee'} exact activeClassName={navStyles['lss-nav-selected']}><ListItemText primary="银行柜员"  /></NavLink>
				</ListItem>
				<ListItem className={navStyles['lss-nav']} button divider>
					<NavLink to={'/customer'} exact activeClassName={navStyles['lss-nav-selected']}><ListItemText primary="客户"  /></NavLink>
				</ListItem>
				<ListItem className={navStyles['lss-nav']} button divider>
					<NavLink to={'/letterCredit'} exact activeClassName={navStyles['lss-nav-selected']}><ListItemText primary="信用证"  /></NavLink>
				</ListItem>
				<ListItem className={navStyles['lss-nav']} button divider>
					<NavLink to={'/allTransactions'} exact activeClassName={navStyles['lss-nav-selected']}><ListItemText primary="所有交易 "  /></NavLink>
				</ListItem>
				<ListItem className={navStyles['lss-nav']} button divider>
					<NavLink to={'/zeus'} exact activeClassName={navStyles['lss-nav-selected']}><ListItemText primary="demo1"  /></NavLink>
				</ListItem>
				<ListItem className={navStyles['lss-nav']} button divider>
					<NavLink to={'/'} exact activeClassName={navStyles['lss-nav-selected']}><ListItemText primary="demp2"  /></NavLink>
				</ListItem>
				<ListItem className={navStyles['lss-nav']} button>
					<NavLink to={'/ablum'} exact activeClassName={navStyles['lss-nav-selected']}><ListItemText primary="demo3" /></NavLink>
				</ListItem>
				<Divider light />
			</List>
		</div>
	);
}

ListDividers.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListDividers);
console.log("进入nav渲染",'/src/components/nav.jsx',(new Date()).getMinutes()+":"+(new Date()).getMilliseconds());