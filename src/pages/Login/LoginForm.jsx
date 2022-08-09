import React, { useState } from "react";
import axios from "axios";
import {Modal} from 'antd'
import { useNavigate,Link } from "react-router-dom";
import {CheckOutlined} from '@ant-design/icons';
import "./login.css"

function LoginForm(){
	const [details,setDetails] = useState({email:"",password:"",logging:false});
	const history = useNavigate();
	const passwdChecking = e =>{
		
		e.preventDefault();	//avoid page re-render
		axios.post("https://eventeasynew.azurewebsites.net/api/user/login/",details)
		.then(response => { //200
			sessionStorage.setItem('username',response.data.userName)
			sessionStorage.setItem('id',response.data.userId)
			//console.log(response.data.userId)
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
			</form>
			
	  	</div>
	  </div>
	
    )
}

export default LoginForm