import React, { useState }  from 'react'
import axios from "axios";
import './register.css';
import {Modal} from 'antd';
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
      phoneNumber: '',
      accessNumber:5  //5 means user
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
      console.log(response)
      sessionStorage.setItem('id',response.data.userId)
			
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
		})
	}

    return(
      <div class="regiBase">
        <div className="regiBox">
          <div className="left">
            <div className='home'>
              <h4><Link to="/">HOME</Link></h4>
              </div>
          </div>
          <div className="right">
            <form onSubmit={submitHandler}>
              <h3>Hi Customer</h3>
              
              <div class="form f-user">
                <div class="item">
                  <label for="userName">username</label>
                  <input name="userName" type="text" placeholder="username" 
                  value={details.userName} onChange={e=>setDetails({...details,userName:e.target.value})} required/>
                </div>
                <div class="item">
                  <label for="email">Email</label>
                  <input name="email" type="email" placeholder="email" 
                  value={details.email} onChange={e=>setDetails({...details,email:e.target.value})} required/>
                </div>
                <div class="item">
                  <label for="password">Password</label>
                  <input type="password" name="password" placeholder="password"
                  value={details.password} onChange={e=>setDetails({...details,password:e.target.value})} required/>
                </div>
                <div class="item">
                  <PasswordStrengthBar password={details.password} style={{width:'120px',marginLeft:'1vw'}}/>
                </div>
              </div>
              <div class="sending send-user">
                <button type="submit" class="submit">Submit</button>
              </div>  
              <p className='sign-notice'>By signing up, you agree to our communication and usage terms. 
                Already have an account? <a><Link to="/login">Login In</Link></a>
              </p>
            </form>
          </div>
		    </div>
      </div>
    )
  {/* <div class="item">
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
                  <input name="phoneNumber" type="text" placeholder="phone number" 
                  value={details.phoneNumber} onChange={phoneCheck} required/>
                </div> */}
}


export default Customer