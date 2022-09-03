import React, {useState,useEffect} from 'react';
import axios from "axios";
import Header from "../../layout/Header";
import { Link,Outlet,useLocation,useOutlet } from "react-router-dom";
import './profile.css';
const Context = React.createContext({});

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
  useEffect(() => {
      getProfile();
      setBookSelect(location.pathname=='/profile'?true:false);
    }, []);
    return (
      <div className='profile'>
        <Header/>
        <div className='upper'>
          <div className='avatar'>
            <div className='ava-pic' 
            style={{
              backgroundImage:`url("https://easyevent.blob.core.windows.net/image/${userInfo.tokenNumber}")`
            }}></div>
            <button>change profile</button>
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

