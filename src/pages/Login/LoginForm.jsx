/*
This file logs people in

Created by Mingke Deng, and Hans Wang
Last Modified: 23/09/2022
*/
import React, { useState } from "react";
import axios from "axios";
import {Modal} from 'antd';
import { useNavigate,Link } from "react-router-dom";
import {CheckOutlined} from '@ant-design/icons';
import "./login.css";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import {Bars,ThreeDots} from 'react-loader-spinner';

function LoginForm(){
	const [details,setDetails] = useState({email:"",password:"",logging:false});
	const history = useNavigate();
	const LoadingIndicator = () => {
	const { promiseInProgress } = usePromiseTracker();
	return (
		promiseInProgress &&<div
		style={{marginLeft:"14vw"}}>
			<ThreeDots color="#00BFFF" height={80} width={80} />
		</div>
		
    	
	);}

	const passwdChecking = e =>{
		
	e.preventDefault();	//avoid page re-render
	trackPromise(
		
		axios.post("https://eventeasyau.azurewebsites.net/api/user/login/",details)
		.then(response => { //200
			console.log(details)
			sessionStorage.setItem('id',response.data.userId)
			sessionStorage.setItem('username',response.data.userName)
			sessionStorage.setItem('access',response.data.accessNumber)
			Modal.confirm({
				//a pop up window
				icon:<CheckOutlined />,
				title:'Congratulations',
				content:'Your Identity was Identified, Welcome !!!',
				onOk:()=>{
					history(-1)
				}
			  })
			console.log(response)
		})
		.catch(error=>{
			console.log(error)
			Modal.confirm({
				//a pop up windows
				title:'Verification Failed',
				content:'Your Password Is Not Correct !!!',
			  })
		}))
	
	}

    return(
      <div class="loginBase">
		
		<div class="loginBox">
			<form onSubmit={passwdChecking} >
				<h3>Welcome</h3>

				<h5><Link to="/">home</Link></h5>
				
				<div class="loginForm">
					<div class="item">
						<input name="email" type="text" placeholder="email" 
						value={details.email} onChange={e=>setDetails({...details,email:e.target.value})} required/>
					</div>
					<div class="item">
						<input type="password" name="password" placeholder="password"
						value={details.password} onChange={e=>setDetails({...details,password:e.target.value})} required/>
					</div>
				</div>
				<div class="logSend">
					<button type="submit" class="submit">Login</button>
					<p class="desc"><Link to='/reset'>forget password?</Link></p>
				</div>
				<LoadingIndicator/>
			</form>
			
	  	</div>
		 
	  </div>
	
    )
}

export default LoginForm