/*
This file shows the dashboard

Created by Mingke Deng, and Hans Wang
Last Modified: 23/09/2022
*/
import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Slider from '../../layout/slider';
import Header from '../../layout/Header';
import './dashboard.css';
import Navbar from '../Home/homes/Navbar';
import { ThreeDots } from 'react-loader-spinner';

export default class Entry extends Component {


  render() {

    return (
      <div className='dashboard'> 
        <Navbar/>
        <div className='dashboard-user'>
          <div className='m-slide'>
            <Slider/>
          </div>

          <div className='m-content'>  
            {/**dynamic page */}
            <Outlet/>
          </div>
        </div>
      </div>
    )
  }
}
