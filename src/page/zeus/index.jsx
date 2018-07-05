import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../action/zeus';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import lssStyle from './index.css';
console.log("主页面引入action/zeus后，进行页面渲染",(new Date()).getMinutes()+":"+(new Date()).getMilliseconds());

class Zeus extends Component {
	componentDidMount() {
		let dispatch = this.props.dispatch;
		dispatch(actions.getZeus());
	}
	render() {
		return (
			<Paper className={lssStyle["lss-paper"]}>
				<Table>
					<TableHead className={lssStyle["lss-table-head"]}>
						<TableRow>
							<TableCell numeric>agencyId</TableCell>
							<TableCell numeric>companyName</TableCell>
							<TableCell numeric>$class</TableCell>
							<TableCell numeric>areaId</TableCell>
							<TableCell numeric>countryId</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.zeus.map((ele, idx) => {
							return (
								<TableRow key={idx}>
									<TableCell numeric>{ele.agencyId}</TableCell>
									<TableCell numeric>{ele.companyName}</TableCell>
									<TableCell numeric>{ele.$class}</TableCell>
									<TableCell numeric>{ele.areaId}</TableCell>
									<TableCell numeric>{ele.countryId}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
		    </Paper>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	isFetching: state.zeus.isFetching,
	zeus: state.zeus.data
});

export default connect(mapStateToProps)(Zeus);