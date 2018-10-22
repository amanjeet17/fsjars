import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { raiseLoan,fixRole,approveLoan } from '../../actions/loanActions';
import axios from 'axios';


class Dashboard extends Component{

  constructor(props) {
  super(props);
  var Role;
  this.state = {
    options: [],
    selectedRole:undefined,
    amount:null,
    status:null
  };
  // console.log("inside constructor state",this.state)
  this.handleAddOption = this.handleAddOption.bind(this);
  // this.handleChange = this.handleChange.bind(this);
}
componentDidMount() {
const response =   axios.get('/api/users/current')
                    .then(res => {
                      console.log(res);
                      if(res.data.role === "Loan Required"){
                        console.log("Loan data",res.data);
                      let selectedRole = res.data.role
                      let amount = res.data.amount
                      let status = res.data.status
                      this.setState((prevState) => ({
                        selectedRole: selectedRole,
                        amount: amount,
                        status:status
                      }));
                      console.log("API Response for Loan required",this.state);
                      }

                      else if(res.data.role === "undefined"){
                        let selectedRole = res.data.role
                        this.setState((prevState) => ({
                          selectedRole: selectedRole
                        }));
                        console.log("API Response for Undefined",this.state);
                      }
                      else if(res.data.role === "admin"){
                        let selectedRole = "Loan Lender"
                        let options = res.data.options
                        this.setState((prevState) => ({
                          selectedRole: selectedRole,
                          options: options,
                        }));
                        console.log("API Response for admin",this.state);
                      }
                      else {
                        let selectedRole = "Loan Lender"
                        let options = res.data.options
                        this.setState((prevState) => ({
                          selectedRole: selectedRole,
                          options: options,
                        }));
                        console.log("API Response for Loan Lender",this.state);
                      }
                    });
}

handleAddRole = (e) =>{
  e.preventDefault();
  let res = this.menu.value;
  if(res!=''){
  this.setState(() => ({
    selectedRole:res
  }));
const  addrole ={
    role:res
  }
  console.log(addrole);
  this.props.fixRole(addrole);
  }
  else{
    alert('select a valid role');
  }
}
handleApprove = (event )=> {
  const approvedLoan = {
    loanid:event.target.id,
    status:"approved"
  }
  const newOptions = this.state.options.filter(function(option) {
    if(option._id == approvedLoan.loanid){
      option.status = approvedLoan.status
    }
    return option;
  });
  this.setState((prevState) => ({
  options:newOptions
  }));
  this.props.approveLoan(approvedLoan)
}

handleAddOption = (e) => {
  e.preventDefault();
  const option = e.target.elements.option.value.trim();
  // this.setState((prevState) => ({
  //   // options: prevState.options.concat(option),
  //   amount:option
  // }));
  e.target.elements.option.value='';
  const loanData ={
    amount:option,
    status:"pending"
  }
  this.setState(() => ({
    amount:loanData.amount,
    status:loanData.status
  }));
  this.props.raiseLoan(loanData);
};
  render() {
    const { user } = this.props.auth;
    const { options ,selectedRole ,amount,status} = this.state;
    return (
      <div>
      {
        user.role == "admin" ?
        <div>
        {this.state.options.length>0 ?
          <div> You are Admin,<p>Below are Loan enquiry raised on platform</p>
          {this.state.options.map((option) =>
            (<li  key={option._id}>Asked Loan Amount {option.amount}
               </li>))
          }
          </div>
          :"No loan enquiry is raised"
        }

        </div>
         :
         <div>
      <h1>Hello {user.name}</h1>
      {
        selectedRole == undefined &&
        <form onSubmit={this.handleAddRole}>
        <label>
          Please Select your role:
          <select ref = {(input)=> this.menu = input} >
            <option value=''></option>
            <option value='Loan Required'>Loan Required</option>
            <option value='Loan Lender'>Loan Lender</option>
          </select>
        </label>
        <button>Fix my Role</button>
        </form>
      }
      {selectedRole == "Loan Required" && amount ==null &&
        <div>
        <h3>Enter the amount needed:</h3>
      <form onSubmit={this.handleAddOption}>
        <input type="text" name="option" />
        <button>Ask Loan</button>
        </form>
      </div>
    }{
      amount !== null && <li> You have asked for loan amount of {amount} and its approval status is : {status}</li>
    }
      {selectedRole == "Loan Lender" &&
      <div>
        <h3>Below People have asked for Loan</h3>
        <div>
        {this.state.options.map((option) =>
          (<li  key={option._id}>Asked Loan Amount {option.amount}
            { option.status =="pending" ?
             <button id={option._id} onClick={this.handleApprove}>  Approve</button>: <b>" is Approved"</b>}
             </li>))
        }
        </div>
      </div>
      }
      </div>
      }
      </div>
    );
  }
}



Dashboard.propTypes = {
  approveLoan:PropTypes.func.isRequired,
  fixRole:PropTypes.func.isRequired,
  raiseLoan:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {approveLoan,raiseLoan,fixRole})(
  Dashboard
);
