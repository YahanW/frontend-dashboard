/*
This file shows some successful events examples

Created by Mingke Deng, and Hans Wang
Last Modified: 23/09/2022
*/
import React, { useState } from 'react';
import './HomeService.css';
import NavBar from './homes/Navbar';
import Footer from './homes/Footer';
import {Link} from 'react-router-dom';

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
          <div className='item' style={{backgroundImage:`url("https://images.unsplash.com/photo-1550005809-91ad75fb315f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80")`}}>
            <Link to="/result/1/intro"><div style={{width:"inherit",height:"inherit"}}></div></Link>
          </div>
          <div className='item' style={{backgroundImage:`url("https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`}}>
            <Link to="/result/2/intro"></Link>
          </div>
          <div className='item' style={{backgroundImage:`url("https://images.unsplash.com/photo-1560173045-beaf11c65dce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80")`}}>
            <Link to="/result/3/"></Link>
          </div>
          
        </div>
       </div>
       <Footer/>
     </div>
    )
  
}
