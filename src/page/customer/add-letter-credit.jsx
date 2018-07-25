import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import indexStyle from './index.css';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



function getSteps() {
  return ['step1', 'step2', 'step3', 'step3', 'step3', 'step3', 'step3', 'step3'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Uknown stepIndex';
  }
}

class addLetterCredit extends Component {
	constructor(props){
        super(props);
        console.log(props)
        this.state = {
			activeStep: 3,
        	editProductDetails:false,
        	editRule:false,
        	$class: "org.example.loc.LetterOfCredit",
		    letterId: "L下午44559",
		    //applicant: "resource:org.example.loc.Customer#alice",
		    //beneficiary: "resource:org.example.loc.Customer#bob",
		    //issuingBank: "resource:org.example.loc.Bank#BoD",
    		//exportingBank: "resource:org.example.loc.Bank#EB",
			productDetails: {
				$class: "org.example.loc.ProductDetails",
				productType: "",
				quantity: 0,
				pricePerUnit: 0,
				id:''
			},
			rules:{
				ruleClass1:'org.example.loc.Rule',
				ruleClass2:'org.example.loc.Rule',
				ruleClass3:'org.example.loc.Rule',
				ruleId1:'rule1',
				ruleId2:'rule2',
				ruleId3:'rule3',
				ruleText1:'The correct quantity of product has been delivered.',
				ruleText2:'The product was received within 30 days of the placement of the order.',
				ruleText3:'The product is not damaged and functions as expected.'
			}
        }
    }
	handleNext = () => {
		const { activeStep } = this.state;
		this.setState({
			activeStep: activeStep + 1,
		});
	};
	handleBack = () => {
		const { activeStep } = this.state;
		this.setState({
			activeStep: activeStep - 1,
		});
	};
	handleReset = () => {
		this.setState({
			activeStep: 0,
		});
	};
    handleChange = (_this,ele,tarEvent) => {
	   	let data = Object.assign({}, this.state[ele], { [tarEvent.target.name]: tarEvent.target.value });
	   	let _val = {};
	   	_val[ele] = data;
		this.setState(_val);
	}
    switchEdiProductDetails() {
		const currentState = this.state.editProductDetails;
		this.setState({
			editProductDetails: !currentState
		});
	}
	switchEdiRule() {
		const currentState = this.state.editRule;
		this.setState({
			editRule: !currentState
		});
	}
	subLetterCredit() {
		var data = {
					"$class": "org.example.loc.LetterOfCredit",
					"letterId": "L下午1",
					"applicant": {},
					"beneficiary": {},
					"issuingBank": {},
					"exportingBank": {},
					"rules": [
						{
							"$class": this.state.rules.ruleClass1,
							"ruleId": this.state.rules.ruleId1,
							"ruleText": this.state.rules.ruleClass1
						},
						{
							"$class": this.state.rules.ruleClass2,
							"ruleId": this.state.rules.ruleId2,
							"ruleText": this.state.rules.ruleClass2
						},
						{
							"$class": this.state.rules.ruleClass3,
							"ruleId": this.state.rules.ruleId3,
							"ruleText": this.state.rules.ruleClass3
						}
					],
					"productDetails": this.state.productDetails,
					"evidence": [],
					"approval": [
						{}
					],
					"status": "AWAITING_APPROVAL",
					"closeReason": "string"
				};
		console.log(data)
	}
	render() {
		//console.log((new Date().getTime()))
		const steps = getSteps();
		const { activeStep } = this.state;
		return(
			<div className={indexStyle["bfb-pager"]}>
				<div className={indexStyle["mianbaoxie"]}>
					<Link to="/customer">Customer</Link><span>></span><a className={indexStyle["on-active"]}>add-letter-credit</a>
				</div>
				<div className={indexStyle['step-list']}>
					<Stepper className={indexStyle['step-cons']} activeStep={activeStep} alternativeLabel>
						{steps.map(label => {
							return (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
					<div>
						{this.state.activeStep === steps.length ? (
							<div>
								<Typography>
									All steps completed - you&quot;re finished
								</Typography>
								<Button onClick={this.handleReset}>Reset</Button>
							</div>
						) : (
							<div>
								<Typography>{getStepContent(activeStep)}</Typography>
								<div>
									<Button disabled={activeStep === 0} onClick={this.handleBack}> Back </Button>
									<Button variant="contained" color="primary" onClick={this.handleNext}>
										{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
									</Button>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className={indexStyle['glss-warp']}>
					<div className={indexStyle['glss-left']}>
						<div className={indexStyle['glss-l-left']+' '+indexStyle['lss-border-grid']} >
							<div className={indexStyle["application-grid"]}>
								<h2>申请人信息</h2>
								<div className={indexStyle["item-nv"]}>
									<p>NAME Alice Hamilton</p>
									<p>COMPANY NAME QuickFix IT</p>
									<p>IBANIT60 9876 5321 9090</p>
									<p>SWIFT CODEBKDOIT60</p>
									<p>BANK NAMEBank of Dinero</p>
								</div>
							</div>
							<div className={indexStyle["supplier-grid"]}>
								<h2>接收方信息</h2>
								<div className={indexStyle["item-nv"]}>
									<p>NAME Alice Hamilton</p>
									<p>COMPANY NAME QuickFix IT</p>
									<p>IBANIT60 9876 5321 9090</p>
									<p>SWIFT CODEBKDOIT60</p>
									<p>BANK NAMEBank of Dinero</p>
								</div>
							</div>
						</div>
						<div className={indexStyle['glss-l-right']}>
							<div className={indexStyle["product-grid"]+' '+indexStyle['lss-border-grid']}>
								<h2>Product Details</h2>
								<label>
									<p className={indexStyle['grid-ls-label']}>$class</p>
									<span className={indexStyle['grid-ls-con']}>{this.state.productDetails.$class}</span>
								</label>
								<label>
									<p className={indexStyle['grid-ls-label']}>TYPE</p>
									<p className={indexStyle['grid-ls-con']}>
										{(this.state.editProductDetails) ? <input type="text" name="productType" onChange={this.handleChange.bind(this,'target','productDetails')} value={this.state.productDetails.productType} /> : <span>{this.state.productDetails.productType}</span>}
									</p>
								</label>
								<label>
									<p className={indexStyle['grid-ls-label']}>QUANTITY</p>
									<p className={indexStyle['grid-ls-con']}>
										{(this.state.editProductDetails) ? <input type="text" name="quantity" onChange={this.handleChange.bind(this,'target','productDetails')} value={this.state.productDetails.quantity} /> : <span>{this.state.productDetails.quantity}</span>}
									</p>
								</label>
								<label>
									<p className={indexStyle['grid-ls-label']}>PRICE PER UNIT</p>
									<p className={indexStyle['grid-ls-con']}>
										{(this.state.editProductDetails) ? <input type="text" name="pricePerUnit" onChange={this.handleChange.bind(this,'target','productDetails')} value={this.state.productDetails.pricePerUnit} /> : <span>{this.state.productDetails.pricePerUnit}</span>}
									</p>
								</label>
								<label>
									<p className={indexStyle['grid-ls-label']}>TOTAL</p>
									<p className={indexStyle['grid-ls-con']}>
										€{this.state.productDetails.quantity*this.state.productDetails.pricePerUnit}
									</p>
								</label>
							</div>
							<div>
								<button className={indexStyle['editButton']} onClick={this.switchEdiProductDetails.bind((this))}>
									<span style={{float:this.state.editProductDetails ? 'right' : 'left'}}>{this.state.editProductDetails ? 'Save' : 'Edit'}</span>
								</button>
							</div>
						</div>
						<div className={indexStyle["rule-grid"]}>
							<div className={indexStyle['lss-border-grid']+' '+indexStyle['rule-cons']}>
								<h2>Terms of Letter of Credit</h2>
								<ul>
									<li>
										{this.state.editRule ? <input type="text" name="ruleText1" onChange={this.handleChange.bind(this,'target','rules')} value={this.state.rules.ruleText1} /> : this.state.rules.ruleText1}
									</li>
									<li>
										{this.state.editRule ? <input type="text" name="ruleText2" onChange={this.handleChange.bind(this,'target','rules')} value={this.state.rules.ruleText2} /> : this.state.rules.ruleText2}
									</li>
									<li>
										{this.state.editRule ? <input type="text" name="ruleText3" onChange={this.handleChange.bind(this,'target','rules')} value={this.state.rules.ruleText3} /> : this.state.rules.ruleText3}
									</li>
								</ul>
							</div>
							<button className={indexStyle['editButton']} onClick={this.switchEdiRule.bind((this))}>
								<span className={this.state.editRule ? indexStyle['r'] : ''}>{this.state.editRule ? 'Save' : 'Edit'}</span>
							</button>
						</div>
					</div>
					<div className={indexStyle['glss-right']} style={{display:'none'}}>
						<ul className={indexStyle['lss-grid']+' '+indexStyle['lss-border-grid']}>
							<li>
								<span>Approved by Matías</span>
								<span>2018-07-16</span>
								<span>17:31:08</span>
							</li>
						</ul>
					</div>
				</div>
				<div className={indexStyle['subBtn']}>
					<button disabled="true">Submit</button>
				</div>
			</div>
		);
	}
}
export default addLetterCredit;