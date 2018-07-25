import React,{ Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShowIcon from '@material-ui/icons/Details';

import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import lssStyle from './index.css';
import Notifi from '../../components/NotificationBar';

class letterCreditList extends Component {
	constructor(props){
        super(props)
        this.getData=this.getData.bind(this);
        this.addCustomer=this.addCustomer.bind(this);
        this.closeNotifi = this.closeNotifi.bind(this);
        this.state={
            datas:[],
            bankList:[],
            display_name:'none',
            formData:{
	            $class:'org.example.loc.Customer',
	            bank:'org.example.loc.Bank',
	            companyName:'',
	            personId:'',
	            name:'',
	            lastName:'',
	            bankID:''
            },
            notifi:{
            	msg:'',
            	open:false,
            	type:'success'
            }
        }
    }
	display_name() {
        if (this.state.display_name === 'none') {
            this.setState({
                display_name: 'block',
            })
        }
        else if (this.state.display_name === 'block') {
            this.setState({
                display_name: 'none',
                name: '',
                bankID: ''
            })

        }
    }
    getData(){
    	return new Promise((resolve, reject) => {
			fetch('http://localhost:3000/api/LetterOfCredit')
			.then(response=>response.json())
        	.then(data=>{
        		this.setState({datas:data})
        	})
		    .catch((res)=>{
		        console.log(50,res.status);
		    });
		});
    }
	addCustomer(){
		if(this.state.formData.$class && this.state.formData.bank && this.state.formData.name){
			const formData = {
				$class:this.state.formData.$class,
	            bank:this.state.formData.bank+'#'+this.state.formData.bankID,
	            personId:this.state.formData.personId,
	            companyName:this.state.formData.companyName,
	            name:this.state.formData.name,
	            lastName:this.state.formData.lastName
			}
			const fetchOption = {
				method: 'POST',
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
				body:JSON.stringify(formData)
			}
			new Promise((resolve, reject) => {

				fetch('http://localhost:3000/api/Customer',fetchOption)
				.then(response=>response.json())
	        	.then(data=>{
	        		if(data.error){
	        			this.updateNotifiState('error',data.error.statusCode+",企业添加失败！",true);
	        		}else{
	        			this.updateNotifiState('success',"企业添加成功！",true);
	        			this.display_name();
	        		}
	        		this.getData();
	        		resolve();
	        	})
			    .catch((res)=>{
			        reject();
			    });
			});
		}
	}
	closeNotifi(){
		this.updateNotifiState('',"",false);
	};
	handleChange = event => {
	   	let data = Object.assign({}, this.state.formData, { [event.target.name]: event.target.value })
		this.setState({
			formData: data
		})
	};
	updateNotifiState(type,msg,opens,callBack){
		const _notifi = {				
    		"msg":msg ? msg : this.state.notifi.msg,
    		"open": opens ? opens : false,
    		"type": type ? type : this.state.notifi.type
		}

		this.setState((prevState, props) => ({
		    notifi: _notifi
		}),()=>{
			if(callBack){
				callBack();
			}
		});
	};
	render() {
		const datas=this.state.datas;
		const bankList=this.state.bankList;
		return <Paper className={lssStyle["lss-paper"]}>
			<Table>
				<TableHead className={lssStyle["lss-table-head"]}>
					<TableRow>
						<TableCell>$class</TableCell>
						<TableCell numeric>letterId</TableCell>
						<TableCell numeric>applicant</TableCell>
						<TableCell numeric>status</TableCell>
						<TableCell>SET</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ datas.map((ele, idx) => {
						return (
							<TableRow key={idx}>
								<TableCell component="th" scope="row">{ele.$class}</TableCell>
								<TableCell numeric>{ele.letterId}</TableCell>
								<TableCell numeric>{ele.applicant}</TableCell>
								<TableCell numeric>{ele.status}</TableCell>
								<TableCell>
									<IconButton aria-label="Delete">
										<DeleteIcon />
									</IconButton>
									<IconButton aria-label="Edit">
										<EditIcon />
									</IconButton>
									<IconButton aria-label="Show">
										<ShowIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</Paper>
	};
	componentDidMount(){
		this.getData();
	}
}
export default letterCreditList;
