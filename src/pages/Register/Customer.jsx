import React, { useState }  from 'react'
import axios from "axios";
import './register.css';
import {Modal} from 'antd';
import {CheckOutlined} from '@ant-design/icons';
import { Link,useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import {ThreeDots} from 'react-loader-spinner';

function Customer() {
  const [details,setDetails] = useState({
      userName: '',
			email:'',
			password:'',
      accessNumber:5  //5 means user
		})
   
  const history = useNavigate();
  const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();
    return (
      promiseInProgress &&<div
      style={{marginLeft:"14vw"}}>
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </div>
            
    );}

  const { BlockBlobClient, AnonymousCredential } = require('@azure/storage-blob');
  const sasKey = `?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-09-30T11:42:53Z&st=2022-09-03T03:42:53Z&spr=https,http&sig=ZUKmAOkmWjgmj4%2BnEzXOXkYMP%2BRbnOw1HsAnLDFnIuk%3D`
  const url = 'https://easyevent.blob.core.windows.net'
  const container = 'image'
  const blobUpload = (e) => {
    var blobName = buildBlobName(e.target.files[0].name)

    setDetails({ ...details, imagePath: blobName })

    var login = url + '/' + container + '/' + blobName + '?' + sasKey
    var blockBlobClient = new BlockBlobClient(login, new AnonymousCredential())
    blockBlobClient.uploadBrowserData(e.target.files[0]).then(
      response => {
        console.log(response)
      }
    )
  }

  const buildBlobName = (name) => {
    var filename = name.substring(0, name.lastIndexOf('.'))
    var ext = name.substring(name.lastIndexOf('.'))
    return filename + '_' + Math.random().toString(16).slice(2) + ext

  }

	const submitHandler = e =>{
		e.preventDefault()
    trackPromise(
		axios.post("https://eventeasyau.azurewebsites.net/api/user/create",details)
		.then(response => {
      console.log(response)
      sessionStorage.setItem('id',response.data.userId)
			sessionStorage.setItem('username',response.data.userName);
			sessionStorage.setItem('access',response.data.accessNumber);
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
		}));
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
                  <label for="userName">Username</label>
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
                <div class="item">
                  <label for="imagePath">Profile Picture</label>
                  <input type="file" onChange={e => (blobUpload(e))} />
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
        <LoadingIndicator/>
      </div>
    )
}


export default Customer