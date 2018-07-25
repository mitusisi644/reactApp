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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import lssStyle from './index.css';
import Notifi from '../../components/NotificationBar';

class bankList extends Component {
	constructor(props){
        super(props)
        this.getData=this.getData.bind(this);
        this.addBank=this.addBank.bind(this);
        this.closeNotifi = this.closeNotifi.bind(this);
        this.state={
            datas:[],
            $class:'org.example.loc.Bank',
            name:'',
            bankID:'',
            display_name:'none',
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
			fetch('http://localhost:3000/api/Bank')
			.then(response=>response.json())
        	.then(data=>{
        		this.setState({datas:data})
        	})
		    .catch((res)=>{
		        console.log(50,res.status);
		    });
		});
    }
	addBank(){
		if((this.state.name && this.state.$class && this.state.bankID) || true){
			const formData = {
     			"name":this.state.name,
     			"$class":this.state.$class,
     			"bankID":this.state.bankID
			};

			const fetchOption = {
				method: 'POST',
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
				body:JSON.stringify(formData)
			}
			new Promise((resolve, reject) => {

				fetch('http://localhost:3000/api/Bank',fetchOption)
				.then(response=>response.json())
	        	.then(data=>{
	        		if(data.error){
	        			this.updateNotifiState('error',data.error.statusCode+",机构添加失败！",true);
	        		}else{
	        			this.updateNotifiState('success',"机构添加成功！",true);
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
		this.setState({ [event.target.name]: event.target.value });
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
		return <Paper className={lssStyle["lss-paper"]}>
			<Table>
				<TableHead className={lssStyle["lss-table-head"]}>
					<TableRow>
						<TableCell>$class</TableCell>
						<TableCell numeric>bankID</TableCell>
						<TableCell numeric>name</TableCell>
						<TableCell>SET</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ datas.map((ele, idx) => {
						return (
							<TableRow key={idx}>
								<TableCell component="th" scope="row">{ele.$class}</TableCell>
								<TableCell numeric>{ele.bankID}</TableCell>
								<TableCell numeric>{ele.name}</TableCell>
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
			<div style={{ display: this.state.display_name }}>
				<FormControl>
					<InputLabel htmlFor="class-simple">$class</InputLabel>
					<Input id="class-simple" disabled name="$class" value={this.state.$class} onChange={this.handleChange} />
		        </FormControl>
		        <FormControl>
					<InputLabel htmlFor="name-simple">Name</InputLabel>
					<Input id="name-simple" name="name" value={this.state.name} onChange={this.handleChange} />
		        </FormControl>
		        <FormControl>
					<InputLabel htmlFor="bankID-simple">bankID</InputLabel>
					<Input id="bankID-simple" name="bankID" value={this.state.bankID} onChange={this.handleChange} />
		        </FormControl>
		        <Button onClick={this.addBank}>保存</Button>
			</div>
			<Button color='primary'>
	          <AddIcon onClick={this.display_name.bind(this)} />
	        </Button>
		    <Notifi closeNotifi={this.closeNotifi} msg={this.state.notifi.msg} notifiType={this.state.notifi.type} opens={this.state.notifi.open} />
		</Paper>
	};
	componentDidMount(){
		this.getData();
	}
}
export default bankList;
