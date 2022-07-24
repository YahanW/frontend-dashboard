import React, { useState } from 'react'
import Header from '../../layout/Header'
import './profile.css';
import {Link} from 'react-router-dom'
import Booking from './Booking';
import Personals from './Personals';

function Profile(){
  const {bookSelect} = true;

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
          <div className='nav-sub'>Booking History</div>
          <div className='nav-sub'>Personal Details</div>
        </div>
        {
          bookSelect ? 
          <Personals/>
          :
          <Booking/>
        }


      </div>
    )
  
}

export default Profile
