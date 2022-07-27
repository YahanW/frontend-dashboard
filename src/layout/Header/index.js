import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style/index.css'
export default class Header extends Component {
  render() {
    return (
      <div className='m-header'>
        <div className='location'> 
            <span className="item">TAS | Hobart</span>
            <div className="item">Change Location ?</div>
        </div>
        <div className='trolley'>
          <div className="item">
              <Link to='/profile' className="selec"> 
              {
                  sessionStorage.getItem('email')
                }
                </Link>
          </div>
          <div className="item">
            <Link to='/' className="selec">
              Home
            </Link>
          </div>
          <div className="item">Inbox</div>
          <div className="item">Bookings</div>
          <div className="item">Trolley</div>
        </div>

      </div>
    )
  }
}
