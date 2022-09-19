import React, {useState,useEffect} from 'react';
import axios from "axios";
import Header from "../../layout/Header";
import { Link,Outlet,useLocation,useOutlet } from "react-router-dom";
import './profile.css';
import Navbar from '../Home/homes/Navbar';
const Context = React.createContext({});
const { BlockBlobClient, AnonymousCredential } = require('@azure/storage-blob');
const sasKey = `?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-09-30T11:42:53Z&st=2022-09-03T03:42:53Z&spr=https,http&sig=ZUKmAOkmWjgmj4%2BnEzXOXkYMP%2BRbnOw1HsAnLDFnIuk%3D`
const url = 'https://easyevent.blob.core.windows.net'
const container = 'image'

export default function Profile(){
  const [bookSelect,setBookSelect]=useState(true);
  
  const changeSelectA = () =>{
    this.setBookSelect(true);
  }
  const changeSelectB = () =>{
    this.setBookSelect(false);
  }
  const uid = sessionStorage.getItem('id');
  const location = useLocation(); //get current route path

  const [userInfo,setUserInfo]=useState([])
  const getProfile = async () => {
      const { data } = await axios.get(`https://eventeasyau.azurewebsites.net/api/user/get/${uid}`);
      setUserInfo(data)
    };

  const blobUpload = (e) => {

    var blobName = this.buildBlobName(e.target.files[0].name)
    //console.log(blobName)
    this.formRef.current.setFieldsValue({ tokenNumber: blobName })

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
  useEffect(() => {
      getProfile();
      setBookSelect(location.pathname=='/profile'?true:false);
    }, []);
    return (
      <div className='profile'>
        <Navbar/>
        <div className='upper'>
          <div className='avatar'>
            <div className='ava-pic' 
            style={{
              backgroundImage:`url("https://easyevent.blob.core.windows.net/image/${userInfo.tokenNumber}")`
            }}></div>
            <div className='changeProfile'>
              <h2>Change Profile Picture</h2>
              <input type="file" placeholder='Change Profile Pic' onChange={e => (this.blobUpload(e))}/>
            </div>
          </div>
          <div className='desc'>
            <h1>{userInfo.userName}</h1>
            <h2>{userInfo.tokenNumber?userInfo.tokenNumber:'This guy is too lazy to leave anything.'}</h2>
          </div>
        </div>
        <div className='navies'>
          <div className='nav-sub'
          style={{borderBottom:bookSelect?'3px solid #33A1C9':''}}
          >
            <Link onClick={changeSelectA} to="/profile">Booking History</Link>
          </div>
          <div className='nav-sub'
           style={{borderBottom:bookSelect?'':'3px solid #33A1C9'}}
           >
            <Link onClick={changeSelectB} to="/profile/personal">Personal Details</Link>
          </div>
        </div>
          <Outlet/>
      </div>
    )
}

