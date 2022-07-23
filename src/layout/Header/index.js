import React, { Component } from 'react'
import {Space} from 'antd'
import { Link } from 'react-router-dom'
import './style/index.css'
export default class Header extends Component {
  render() {
    return (
      <div className='m-header'>
        
        <div className='location'> 
            <span className="item">TAS | Hobart</span>
            <a className="item">Change Location ?</a>
        </div>
        <div className='trolley'>
        <a className="item">
             <Link to='/profile'> 
             {
                sessionStorage.getItem('email')
              }
              </Link>
            </a>
            <a className="item"><Link to='/'>Home</Link></a>
            <a className="item">Inbox</a>
            <a className="item">Bookings</a>
            <a className="item">Trolley</a>
        </div>
      </div>
    )
  }
}
