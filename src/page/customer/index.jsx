import React,{ Component } from 'react';
import { Link } from "react-router-dom";
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

class CustomerList extends Component {
	constructor(props){
        super(props)
        this.getBankData=this.getBankData.bind(this);
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
    getBankData(){
    	return new Promise((resolve, reject) => {
			fetch('http://localhost:3000/api/Bank')
			.then(response=>response.json())
        	.then(data=>{
        		this.setState({bankList:data})
        	})
		    .catch((res)=>{
		        console.log(50,res.status);
		    });
		});
    }
    getData(){
    	return new Promise((resolve, reject) => {
			fetch('http://localhost:3000/api/Customer')
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
						<TableCell numeric>bank</TableCell>
						<TableCell numeric>personId</TableCell>
						<TableCell numeric>companyName</TableCell>
						<TableCell numeric>name</TableCell>
						<TableCell numeric>lastName</TableCell>
						<TableCell>SET</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ datas.map((ele, idx) => {
						return (
							<TableRow key={idx}>
								<TableCell component="th" scope="row">{ele.$class}</TableCell>
								<TableCell numeric>{ele.bank}</TableCell>
								<TableCell numeric>{ele.personId}</TableCell>
								<TableCell numeric>{ele.companyName}</TableCell>
								<TableCell numeric>{ele.name}</TableCell>
								<TableCell numeric>{ele.lastName}</TableCell>
								<TableCell>
									<Link to={{path:'/customer/addLetterCredit',query:{name:ele.personId}}}>
										<AddIcon />
									</Link>
									<IconButton aria-label="Edit">
										<EditIcon />
									</IconButton>
									<IconButton aria-label="Show">
										<ShowIcon />
									</IconButton>
									<IconButton aria-label="Delete">
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
			<div style={{ display: this.state.display_name }}>
				<FormControl>
					<InputLabel htmlFor="class-simple">$class</InputLabel>
					<Input id="class-simple" disabled name="$class" value={this.state.formData.$class} />
		        </FormControl><br />
		        <FormControl>
					<InputLabel htmlFor="bank-simple">bank</InputLabel>
					<Input id="bank-simple" disabled name="bank" value={this.state.formData.bank+"#"+this.state.formData.bankID} />
		        </FormControl><br />
		        <FormControl>
					<InputLabel htmlFor="bankID-simple">bankID</InputLabel>
					<Select
						value={this.state.formData.bankID}
						onChange={this.handleChange}
						inputProps={{
						name: 'bankID',
						id: 'bankID-simple',
						}}>
						<MenuItem value=''><em> --- None --- </em></MenuItem>
						{ bankList.map((ele,idx) => {
							return (
								<MenuItem key={idx} value={ele.bankID}><em>{ele.name}</em></MenuItem>
							)
						})}
					</Select>

		        </FormControl><br />
		        <FormControl>
					<InputLabel htmlFor="personId-simple">personId</InputLabel>
					<Input id="personId-simple" name="personId" value={this.state.formData.personId} onChange={this.handleChange} />
		        </FormControl><br />
		        <FormControl>
					<InputLabel htmlFor="companyName-simple">companyName</InputLabel>
					<Input id="companyName-simple" name="companyName" value={this.state.formData.companyName} onChange={this.handleChange} />
		        </FormControl><br />
		        <FormControl>
					<InputLabel htmlFor="name-simple">Name</InputLabel>
					<Input id="name-simple" name="name" value={this.state.formData.name} onChange={this.handleChange} />
		        </FormControl><br />
		        <FormControl>
					<InputLabel htmlFor="lastName-simple">lastName</InputLabel>
					<Input id="lastName-simple" name="lastName" value={this.state.formData.lastName} onChange={this.handleChange} />
		        </FormControl>
		        <div>
		        	<Button onClick={this.addCustomer}>保存</Button>
		        </div>
			</div>
			<Button color='primary'>
	          <AddIcon onClick={this.display_name.bind(this)} />
	        </Button>
		    <Notifi closeNotifi={this.closeNotifi} msg={this.state.notifi.msg} notifiType={this.state.notifi.type} opens={this.state.notifi.open} />
		</Paper>
	};
	componentDidMount(){
		this.getData();
		this.getBankData();
	}
}
export default CustomerList;
