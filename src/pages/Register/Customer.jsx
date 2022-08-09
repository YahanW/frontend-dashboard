import React, { useState }  from 'react'
import axios from "axios";
import './register.css';
import {Modal,Input} from 'antd';
import {CheckOutlined} from '@ant-design/icons';
import { Link,useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';

function Customer() {
  const [details,setDetails] = useState({
      userName: '',
      firstName: '',
      lastName: '',
      dob: '',
			email:'',
			password:'',
      phoneNumber: ''
		})
  const history = useNavigate();

	const phoneCheck = e => 
  {
    const reg = /^-?(04|[0-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(e.target.value) && reg.test(e.target.value)) || e.target.value === '' || e.target.value === '-') 
    {
      console.log("ok")
      setDetails({...details,phoneNumber:e.target.value})
     
    }else{
      console.log("error")
    }
   
  }
	const submitHandler = e =>{
		e.preventDefault()
		axios.post("https://eventeasynew.azurewebsites.net/api/user/create",details)
		.then(response => {
      //sessionStorage.setItem('username',response.data.userName)
      sessionStorage.setItem('id',response.data)
			
			Modal.confirm({
				//a pop up window
				icon:<CheckOutlined />,
				title:'Congradulations',
				content:'Your Identity was Identified, Welcome !!!',
				onOk:()=>{
					history("/")
				}
			  })
			//console.log(response)
			//alert("Congradulations!! Register Finished !!!");
		})
		.catch(error=>{
			console.log(error)
			//alert("Something went wrong");
		})
	}

    return(
      <div class="regiBase">
        <div id="regiBox">
          <div id="left"></div>
          <div id="right">
            <form onSubmit={submitHandler}>
              <div className='hello'>
                <h3>Hi Customer</h3>
                <div className='home'><a><Link to="/">home</Link></a></div>
              </div>
              <div class="form">
                <div class="item">
                  <input name="userName" type="text" placeholder="username" 
                  value={details.userName} onChange={e=>setDetails({...details,userName:e.target.value})} required/>
                </div>
                <div class="item">
                  <input name="firstName" type="text" placeholder="firstname" 
                  value={details.firstName} onChange={e=>setDetails({...details,firstName:e.target.value})} required/>
                </div>
                <div class="item">
                  <input name="lastName" type="text" placeholder="lastname" 
                  value={details.lastName} onChange={e=>setDetails({...details,lastName:e.target.value})} required/>
                </div>
                <div class="item">
                  <input name="dob" type="date" placeholder="date of birth" 
                  value={details.dob} onChange={e=>setDetails({...details,dob:e.target.value})} required/>
                </div>
                <div class="item">
                  <input name="email" type="text" placeholder="email" 
                  value={details.email} onChange={e=>setDetails({...details,email:e.target.value})} required/>
                </div>
                <div class="item">
                  <input type="password" name="password" placeholder="password"
                  value={details.password} onChange={e=>setDetails({...details,password:e.target.value})} required/>
                </div>
                <PasswordStrengthBar password={details.password} />
                <div class="item">
                  <input name="phoneNumber" type="text" placeholder="phone number" 
                  value={details.phoneNumber} onChange={phoneCheck} required/>
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


export default Customer