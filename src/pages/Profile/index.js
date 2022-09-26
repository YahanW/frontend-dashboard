/*
This file is the base of the profile page

Created by Mingke Deng, and Hans Wang
Last Modified: 25/09/2022
*/
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link, Outlet, useLocation, useOutlet, useNavigate } from "react-router-dom";
import './profile.css';
import './Person.css';
import Navbar from '../Home/homes/Navbar';
import { Form, Input, message } from 'antd';

const Context = React.createContext({});
const { BlockBlobClient, AnonymousCredential } = require('@azure/storage-blob');
const sasKey = `?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-09-30T11:42:53Z&st=2022-09-03T03:42:53Z&spr=https,http&sig=ZUKmAOkmWjgmj4%2BnEzXOXkYMP%2BRbnOw1HsAnLDFnIuk%3D`
const url = 'https://easyevent.blob.core.windows.net'
const container = 'image'

export default function Profile() {
  const [bookSelect, setBookSelect] = useState(true);
  const [userInfo, setUserInfo] = useState([])
  //personal detilas
  const history = useNavigate();
  const [profileInfo, setProfileInfo] = useState([])
  const [editing, setEdit] = useState(false);
  const [isEnabled, setEnabled] = useState(true);
  const onChangePerson = () => { setEdit(true); setEnabled(false); }
  const onConfirm = () => { setEdit(false); setEnabled(true); }

  const changeSelectA = () => {
    this.setBookSelect(true);
  }
  const changeSelectB = () => {
    this.setBookSelect(false);
  }
  const uid = sessionStorage.getItem('id');
  const location = useLocation(); //get current route path
  const formRef = React.useRef();

  const getProfile = async () => {
    const { data } = await axios.get(`https://eventeasyau.azurewebsites.net/api/user/get/${uid}`);
    setUserInfo(data);
    formRef.current.setFieldsValue({ ...data })
  };


  const blobUpload = (e) => {
    console.log(e)
    var blobName = buildBlobName(e.target.files[0].name)

    axios.put(`https://eventeasyau.azurewebsites.net/api/User/Update/`, { "userId": uid, "imagePath": blobName })
    .then(response=>{
      console.log("database upload response", response)
    })
    .catch(err=>{
      console.log("upload image error",err)
    })
   
    //console.log(formRef)
    var login = url + '/' + container + '/' + blobName + '?' + sasKey
    var blockBlobClient = new BlockBlobClient(login, new AnonymousCredential())
    blockBlobClient.uploadBrowserData(e.target.files[0]).then(
      response => {
        console.log('blob upload response ', response);
        history(0);
        //console.log(userInfo.imagePath)
      }
    ).catch(err => {
      console.log("Upload failed", err)
    })
  }

  const buildBlobName = (name) => {
    var filename = name.substring(0, name.lastIndexOf('.'))
    var ext = name.substring(name.lastIndexOf('.'))
    return filename + '_' + Math.random().toString(16).slice(2) + ext

  }


  const onSave = (value) => {
    console.log(value);
    axios.put(`https://eventeasyau.azurewebsites.net/api/User/Update/`, value)
      .then(response => {
        console.log(response)
        message.success('User Update Success');
        history(0);
        return
      }).catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className='profile'>
      <Navbar />
      <div className='upper'>
        <div className='avatar'>
          <div className='ava-pic'
            style={{
              backgroundImage: `url("https://easyevent.blob.core.windows.net/image/${userInfo.imagePath}")`
            }}></div>
          <div className='changeProfile'>
            <h2>Change Profile Picture</h2>
            <input type="file" onChange={(e) => { blobUpload(e) }} />
            {/* <button onClick={onSave}>save</button> */}
          </div>
        </div>
        <div className='desc'>
          <div className='PersonList'>

            <Form ref={formRef} onFinish={onSave} className='List'>
              <div className='left'>
                <Form.Item name='userName' label="Username">
                  <Input disabled={isEnabled} />
                </Form.Item>
                <Form.Item name='address' label="&nbsp;&nbsp;&nbsp;Address">
                  <Input disabled={isEnabled} />
                </Form.Item>
                <Form.Item name='password' label="&nbsp;Password">
                  <Input disabled={isEnabled} />
                </Form.Item>
              </div>
              <div className='right'>

                <Form.Item name='email' label="&nbsp;&nbsp;&nbsp;Email ">
                  <Input disabled={isEnabled} />
                </Form.Item>
                <Form.Item name='userId' label="Your ID">
                  <Input disabled={true} />
                </Form.Item>
              </div>
            </Form>

            {
              editing ?
                <button onClick={() => { formRef.current.submit(); onConfirm() }}>Confirm</button>
                :

                <button onClick={() => { onChangePerson() }}>Edit</button>


            }

          </div>
        </div>
      </div>
      <div className='navies'>
        <div className='nav-sub'
          style={{ borderBottom: bookSelect ? '3px solid #33A1C9' : '' }}
        >
          <Link onClick={changeSelectA} to="/profile">Booking History</Link>
        </div>

      </div>
      <Outlet />
    </div>
  )
}

