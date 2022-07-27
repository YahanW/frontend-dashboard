import React, { useState } from 'react';
import Header from '../../layout/Header';
import './profile.css';
import {Link, Outlet} from 'react-router-dom';

function Profile(){
  const [bookSelect,setBookSelect] = useState(true); //default to open booking list sub routing
  const changeSelectA = () =>{
    setBookSelect(true)
  }
  const changeSelectB = () =>{
    setBookSelect(false)
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
            <h1>Jordan Lin</h1>
            <h2>My name is Jordan Lin, and I’m a recent computer science graduate from Stanford University.I’m Avery Lucas, and I’m seeking an entry-level warehousing job that will use my organization, attention to detail and time management skills.My name is Rylan Curtis, and I’m chief engineer for Jacobs and Associates.</h2>
          </div>
        </div>
        <div className='navies'>
          <div className='nav-sub'
          style={{borderBottom:bookSelect?'3px solid #fb850060':''}}
          onClick={changeSelectA}
          >
            <Link to="/profile/booking">Booking History</Link>
          </div>
          <div className='nav-sub'
           style={{borderBottom:bookSelect?'':'3px solid #fb850060'}}
           onClick={changeSelectB}>
            <Link to="/profile/personal">Personal Details</Link>
          </div>
        </div>
        <Outlet/>

      </div>
    )
  
}

export default Profile
