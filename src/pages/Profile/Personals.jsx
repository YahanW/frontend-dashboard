import React, { useState,useEffect } from 'react';
import './index';
import './Person.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Form,Input, InputNumber,message} from 'antd';
import { render } from 'react-dom';

function Personals(){
  const history = useNavigate();
  const [profileInfo,setProfileInfo]=useState([])
  const [editing,setEdit] = useState(false);
  const [isEnabled,setEnabled] = useState(true);
  const onChangePerson = () =>{setEdit(true);setEnabled(false);}
  const onConfirm = () =>{setEdit(false);setEnabled(true);}
  const uid = sessionStorage.getItem('id');
  const formRef= React.useRef();
  const getProfile = async () => {
      const { data } = await axios.get(`https://eventeasyau.azurewebsites.net/api/user/get/${uid}`);
      setProfileInfo(data);
      formRef.current.setFieldsValue({...data})
    };
  useEffect(() => {
      getProfile();
      
    }, []);
  const onSave = (value)=>{
    console.log(value);
    axios.put(`https://eventeasyau.azurewebsites.net/api/User/Update/`,value)
        .then(response=>{
            console.log(response)
            message.success('User Update Success');
            history("/profile/personal")
            return
        }).catch(err=>{
            console.log(err);
        })
  }
  console.log(formRef)
    return (
      <div className='PersonList'>
       
        <Form ref={formRef} onFinish={onSave} className='List'
       
        >
          <div className='left'>
            <Form.Item name='userName' label="Username">
            <Input disabled={isEnabled}/>
            </Form.Item>
            <Form.Item name='address' label="Address">
            <Input disabled={isEnabled}/>
            </Form.Item>
            <Form.Item name='password' label="Password">
            <Input disabled={isEnabled}/>
            </Form.Item>
          </div>
          <div className='right'>
            
            <Form.Item name='email' label="Email">
              <Input  disabled={isEnabled}/>
            </Form.Item>     
            <Form.Item name='userId' label="Your ID">
              <Input  disabled={true}/>
            </Form.Item>     
          </div>    
        </Form>      
       
        {
          editing ? 
          <button onClick={()=>{formRef.current.submit();onConfirm()}}>Confirm</button>
          :
          
          <button onClick={()=>{onChangePerson()}}>Edit</button>
         
          
        }
        
      </div>
      
   
    )
  }


export default Personals
