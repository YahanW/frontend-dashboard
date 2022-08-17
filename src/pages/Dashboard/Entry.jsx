import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Slider from '../../layout/slider'
import Header from '../../layout/Header'

export default class Entry extends Component {
  render() {
    return (
      <div>
      <Header/>
      <div className='app'>
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
