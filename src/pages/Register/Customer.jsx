import React, { Component } from 'react'
import axios from "axios";
import './register.css'

export default class Customer extends Component {
	constructor(props){
		super(props)
		this.state={
      userName: '',
      firstName: '',
      lastName: '',
      dob: '',
			email:'',
			password:'',
      phoneNumber: ''
		}
	}

	changeHandler = e =>{
		this.setState({[e.target.name]:e.target.value})
	}
	submitHandler = e =>{
		e.preventDefault()
		console.log(this.state)
		axios.post("https://easyevent.azurewebsites.net/api/user/create",this.state)
		.then(response => {
			console.log(response)
			alert("Congradulations!! Register Finished !!!");
		})
		.catch(error=>{
			console.log(error)
			alert("Something went wrong");
		})
	}

  render(){
    const {userName, firstName,lastName,dob,email,password,phoneNumber} = this.state
    return(
      <div clas="regiBase">
        <div id="regiBox">
          <div id="left"></div>
          <div id="right">
            <form onSubmit={this.submitHandler}>
              <h3>Hi Customer</h3>
              <div class="form">
                <div class="item">
                  <input name="userName" type="text" placeholder="username" 
                  value={userName} onChange={this.changeHandler} required/>
                </div>
                <div class="item">
                  <input name="firstName" type="text" placeholder="firstname" 
                  value={firstName} onChange={this.changeHandler} required/>
                </div>
                <div class="item">
                  <input name="lastName" type="text" placeholder="lastname" 
                  value={lastName} onChange={this.changeHandler} required/>
                </div>
                <div class="item">
                  <input name="dob" type="date" placeholder="date of birth" 
                  value={dob} onChange={this.changeHandler} required/>
                </div>
                <div class="item">
                  <input name="email" type="text" placeholder="email" 
                  value={email} onChange={this.changeHandler} required/>
                </div>
                <div class="item">
                  <input type="password" name="password" placeholder="password"
                  value={password} onChange={this.changeHandler} required/>
                </div>
                <div class="item">
                  <input name="phoneNumber" type="text" placeholder="phone number" 
                  value={phoneNumber} onChange={this.changeHandler} required/>
                </div>
              </div>
                <div class="sending">
                  <button type="submit" class="submit">Submit</button>
                </div>  
            </form>
          </div>
		    </div>
      </div>
	
    )
  }
}

