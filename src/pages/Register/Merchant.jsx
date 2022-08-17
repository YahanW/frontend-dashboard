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
      phoneNumber: '',
      ABN:'',
      accessNumbrt:3 //3 means merchant
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
        <div className="regiBox">
          <div className="left">
            <div className='home'>
                <h4><Link to="/">HOME</Link></h4>
            </div>
          </div>
          <div className="right">
            <form onSubmit={submitHandler}>
              <div className='hello'>
                <h3>Hi Merchant</h3>
              </div>
              <div class="form">
                <div class="item">
                  <label for="username">Password</label>
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
                  <label for="password">ABN</label>
                  <input name="abn" type="number" placeholder="11 digit identifier" 
                  value={details.phoneNumber} onChange={e=>setDetails({...details,ABN:e.target.value})} required/>
                </div>
                <div class="item">
                  <label for="abnFiles">ABN Documents</label>
                  <input name="abnFiles" type="file" id="abnFiles" multiple
                  style={{height:'10vh'}}
                  required/>
                </div>
                
              </div>
                <div class="sending">
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
  
}


export default Merchant