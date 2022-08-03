import React, { useState,useEffect } from 'react';
import Header from '../../layout/Header';
import './profile.css';
import {Link, Outlet} from 'react-router-dom';
import axios from "axios";

function Profile(){
  const [bookSelect,setBookSelect] = useState(true); //default to open booking list sub routing
  const [userInfo,setInfo] = useState({
    dob:"",email:"",firstName: "",lastName: "",
    password: "",phoneNumber: 0,
    status: 0,userId: 5,userName: ""
})
const setUser = (data) =>{
  setInfo({firstName:data.firstName});
}
  const changeSelectA = () =>{
    setBookSelect(true)
  }
  const changeSelectB = () =>{
    setBookSelect(false)
  }
  const uid = sessionStorage.getItem('id');
  useEffect(() => {    
     //render after every changes
     //ComponentDidMount is a function for react class Running after every component rendered
     userDetail()
     console.log(uid)

  });

  const userDetail = () =>{
		axios.get(`https://eventeasynew.azurewebsites.net/api/user/get/${uid}`)
		.then(response => {
     console.log(response.data.userName);
		 setUser(response.data);
		})
		.catch(error=>{
			console.log(error)
			//alert("Something went wrong");
		})
	}
    return (

      <div className='profile'>
        <Header/>
        <div className='upper'>
          <div className='avatar'>
            <div className='ava-pic'></div>
            <button>change profile</button>
          </div>
          <div className='desc'>
            <h1>ABCD</h1>
            <h2>My name is Jordan Lin, and I’m a recent computer science graduate from Stanford University.I’m Avery Lucas, and I’m seeking an entry-level warehousing job that will use my organization, attention to detail and time management skills.My name is Rylan Curtis, and I’m chief engineer for Jacobs and Associates.</h2>
          </div>
        </div>
        <div className='navies'>
          <div className='nav-sub'
          style={{borderBottom:bookSelect?'3px solid #33A1C9':''}}
          >
            <Link onClick={changeSelectA} to="/profile/booking">Booking History</Link>
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

export default Profile
