import React, { useState } from 'react';
import './HomeService.css';
import NavBar from './homes/Navbar';
import Footer from './homes/Footer';

export default function HomeService(){
  const [serType,setSerType] = useState("WEDDING");
    return (
     <div className='ser-back'>
       <NavBar/>
       <div className='ser-content'>
        <h2>
          {serType}
        </h2>
        <div className='divider'></div>
        <h3 className='useful'>Some Successful Instance</h3>
        <div className='instance'>
          <div className='item'></div>
          <div className='item'></div>
          <div className='item'></div>
          
        </div>
       </div>
       <Footer/>
     </div>
    )
  
}
