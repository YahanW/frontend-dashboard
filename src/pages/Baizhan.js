import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Slider from '../layout/slider'
import Header from '../layout/Header'

export default class Baizhan extends Component {
  render() {
    return (
      <div className='app'>
        <div className='m-slide'>
            <Slider/>
        </div>
        <div className='m-content'>
            <Header/>
            {/**dynamic page */}
            <Outlet/>
        </div>
      </div>
    )
  }
}
