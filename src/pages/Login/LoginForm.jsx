import React, { useState } from "react";
import axios from "axios";
import {Modal} from 'antd'
import { useNavigate } from "react-router-dom";
import {CheckOutlined} from '@ant-design/icons';
import "./login.css"
import CryptoJs from 'crypto-js'

function LoginForm(){
	const [details,setDetails] = useState({email:"",password:"",logging:false});
	const history = useNavigate();
	//GET method
	const allUsers=()=>
	{
	  fetch("https://easyevent.azurewebsites.net/api/user/getall")
	  .then(res=>res.json())
	  .then(data=>{
		  console.log(data)
	  }) //default GET
	}  

	const passwdChecking = e =>{
		
		e.preventDefault();	//avoid page re-render
		axios.post("https://easyevent.azurewebsites.net/api/User/Login",details)
		.then(response => {
			console.log(response)
			Modal.confirm({
				//a pop up window
				icon:<CheckOutlined />,
				title:'Congradulations',
				content:'Your Identity was Identified, Welcome !!!',
				onOk:()=>{
					history("/")
				}
			  })
			

		})
		.catch(error=>{
			console.log(error)
			Modal.confirm({
				//a pop up windows
				title:'Verification Failed',
				content:'Your Password Is Not Correct !!!',
			  })
		})
		
	}
	const submitLocal = e =>{
		e.preventDefault();	//avoid page re-render
		global.request.post('/api/login',{...details,password:CryptoJs.AES.encrypt(details.password,'mingke').toString()})
		.then(data=>{
			setDetails({...details,logging:true})
			if(details.logging)
			{
				Modal.confirm({
				//a pop up window
				icon:<CheckOutlined />,
				title:'Congradulations',
				content:'Your Identity was Identified, Welcome !!!',
				onOk:()=>{
					history("/")
				}
			  })
			}
			
		})
	}
    return(
      <div class="loginBase">
		
		<div id="loginBox">
		<form onSubmit={submitLocal}>
            <h3>Welcome</h3>
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
				<p class="desc"><a href="#">forget password?</a></p>
			</div>
		</form>
		
		<button>
		GET
		</button>
	
	  	</div>
	  </div>
	
    )
}

export default LoginForm