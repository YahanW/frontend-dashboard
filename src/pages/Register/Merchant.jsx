import React, { useState }  from 'react'
import axios from "axios";
import './register.css'
import { Link } from 'react-router-dom';

function Merchant() {
  const [details,setDetails] = useState({
      userName: '',
      firstName: '',
      lastName: '',
      dob: '',
			email:'',
			password:'',
      phoneNumber: ''
		})
	
	const submitHandler = e =>{
		e.preventDefault()
		axios.post("https://easyevent.azurewebsites.net/api/user/create",details)
		.then(response => {
			console.log(response)
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
          <div id="left">
            <div className='dotSet'>
              <div className='pageDot'></div>
              <div className='pageDot'></div>
              <div className='pageDot'></div>
            </div>
          </div>
          <div id="right">
            <form onSubmit={submitHandler}>
              <div className='hello'>
                <h3>Hi Merchant</h3>
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
                <div class="item">
                  <input name="phoneNumber" type="text" placeholder="phone number" 
                  value={details.phoneNumber} onChange={e=>setDetails({...details,phoneNumber:e.target.value})} required/>
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


export default Merchant