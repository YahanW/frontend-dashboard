/*
This file register an user as merchant

Created by Mingke Deng, and Hans Wang
Last Modified: 23/09/2022
*/
import React, { useState,useEffect }  from 'react';
import axios from "axios";
import './register.css';
import {CheckOutlined} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import {ThreeDots} from 'react-loader-spinner';
import {Modal,Button, message} from 'antd';
import XMLParser from 'react-xml-parser';
function Merchant() {
  const [details,setDetails] = useState({
    userName: '',
    email:'',
    password:'',
    accessNumber:3,
    abn:0,
		})
  const history = useNavigate();
  const [abnCheck,setAbnCheck] = useState([]);
  const [valid,setValid] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = async () => {
    getLookUp().then(
      data=>{
        setAbnCheck(data.children[1]);
        if(data.children[1].children[2].name!=='exception'){
          setValid(true);
          console.log("valid")
        }else{
          console.log("invalid")
        }
        
      });
    
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const LoadingIndicator = () => {
      const { promiseInProgress } = usePromiseTracker();
      return (
        promiseInProgress &&<div
        style={{marginLeft:"14vw"}}>
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      );}
	const submitHandler = e =>{
		e.preventDefault()
    if(valid===true){
      trackPromise(
        axios.post("https://eventeasyau.azurewebsites.net/api/user/create",details)
        .then(response => {
          console.log(response)
          sessionStorage.setItem('id',response.data.userId);
          sessionStorage.setItem('username',response.data.userName);
			    sessionStorage.setItem('access',response.data.accessNumber);

          Modal.confirm({
            //a pop up window
            icon:<CheckOutlined />,
            title:'Congradulations',
            content:'Register successed, Welcome !!!',
            onOk:()=>{
              history("/")
            }
            })
        })
        .catch(error=>{
          message.error("username or email already exist");
        }))

    }else{
      window.alert("Please register with a valid ABN");
    }
	}

  const getLookUp = async () =>{
    const {data} = await 
    axios.get(`https://abr.business.gov.au/ABRXMLSearch/AbrXmlSearch.asmx/SearchByABNv201408?searchString=${details.abn}&includeHistoricalDetails=n&authenticationGuid=fbb9c7c6-f657-4411-ae5c-3b5eb36a9fcd`,{
        headers:{
            'Host': 'abr.business.gov.au',
            'Content-Type': 'text/xml',
        }
    })
    
    var xml = new XMLParser().parseFromString(data); 
    console.log('xml',xml)
    return xml;
    //https://abr.business.gov.au/ABRXMLSearch/AbrXmlSearch.asmx/SearchByABNv201408?searchString=74599608295&includeHistoricalDetails=n&authenticationGuid=fbb9c7c6-f657-4411-ae5c-3b5eb36a9fcd
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
                  <label for="username">Username</label>
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
                  <label for="abn">ABN</label>
                  <input name="abn" type="nubmer" placeholder="11 digit identifier" 
                  value={details.abn} onChange={e=>{setDetails({...details,abn:e.target.value});setValid(false);}} required/>
              
                </div>
                <Button type="primary" onClick={showModal}>
                    Check ABN
                </Button>
                <Modal title="ABN LookUp" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                  {
                    abnCheck!==null
                    ?
                    
                    (
                      abnCheck.children?
                      (
                        abnCheck.children[2].name!=='exception'?
                        <div>
 
                          <div><p>{abnCheck.children[3].children[6].children[0].name}:</p></div>
                          <div><p>{abnCheck.children[3].children[6].children[0].value}</p></div>
                          <div><p>ABN Status: {abnCheck.children[3].children[1].children[1].value==='Y'?'Valid':'Invalid'}</p></div>

                          <div><p>{abnCheck.children[3].children[4].children[1].name}:</p></div>
                          <div><p>{abnCheck.children[3].children[4].children[1].value}</p></div>
                        </div>
                        :
                        <div>
                            <div><p>{abnCheck.children[2].name}</p></div>
                            <div><p>{abnCheck.children[2].children[0].value}</p></div>
                        </div>
                      )
                      :
                      <div>a system false</div>
                    )
                    :
                    <div>
                      <p>System error please recheck</p>
                    </div>
                       
                    
                  }
                </Modal>
                
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
        <LoadingIndicator/>
      </div>
	
    )
                
  
}


export default Merchant


//a backup scheme make sure data safe
// const useBeforeRender = (callback, deps) => {
//   const [isRun, setIsRun] = useState(false);

//   if (!isRun) {
//       callback();
//       setIsRun(true);
//   }

//   useEffect(() => () => setIsRun(false), deps);
// };
// useBeforeRender(() => {
// getLookUp().then(
// data=>{
//   setAbnCheck(data.children[1])
// })
// }, []);