import React, { Component } from "react";
import axios from "axios";

import "./login.css"
class LoginForm extends Component{
	constructor(props){
		super(props)
		this.state={
			email:'',
			password:''
		}
	}

	//GET method
	clickGETHandle=()=>
	{
	  fetch("https://easyevent.azurewebsites.net/api/user/getall")
	  .then(res=>res.json())
	  .then(data=>{
		  console.log(data)
	  }) //default GET
	}  

	changeHandler = e =>{
		this.setState({[e.target.name]:e.target.value})
	}
	submitHandler = e =>{
		e.preventDefault()
		axios.post("https://easyevent.azurewebsites.net/api/user/login",this.state)
		.then(response => {
			console.log(response)
			alert("Congradulations!! Login Success !!!");
		})
		.catch(error=>{
			console.log(error)
			alert("Account is not correct");
		})
	}

  render(){
	const {email,password} = this.state
    return(
      <div id="loginBack">
		<form onSubmit={this.submitHandler}>
			<h3>Welcome</h3>
			<div class="loginForm">
				<div class="item">
					<input name="email" type="text" placeholder="email" 
					value={email} onChange={this.changeHandler}/>
				</div>
				<div class="item">
					<input type="password" name="password" placeholder="password"
					value={password} onChange={this.changeHandler}/>
				</div>
			</div>
			<div class="logSend">
				<button type="submit" class="submit">Login</button>
				<p class="desc"><a href="#">forget password?</a></p>
			</div>
		</form>
		<button onClick={this.clickGETHandle}>GET</button>
	  </div>
	
    )
  }
}

export default LoginForm