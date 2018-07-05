import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
	root: {
		flexGrow: 1,
		padding:'0px',

	},
	flex: {
		flex: 1,
	},
	headerStyle: {
		boxShadow:'none'
	}
};

function ButtonAppBar(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.headerStyle}>
				<Toolbar>
					<span>LOGO</span>
					<Typography variant="title" color="inherit" className={classes.flex}>
						Title
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}

ButtonAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
