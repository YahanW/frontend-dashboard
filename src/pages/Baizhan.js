import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'

export default class Baizhan extends Component {
  render() {
    return (
      <div className='app'>
        <div className='m-slide'>
            menu
        </div>
        <div className='m-content'>
            <div>top</div>
            {/**dynamic page */}
            <Outlet/>
        </div>
      </div>
    )
  }
}
