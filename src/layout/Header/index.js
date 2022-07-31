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

        <input type="checkbox" class="nav-toggle" id="nav-toggle"></input>
        <div className='trolley'>
          <ul>
            <li>
              <Link to='/profile' className="selec"> 
              {
                sessionStorage.getItem('email')
              }
              </Link>
            </li>
            <li>
              <Link to='/' className="selec">
                Home
              </Link>
            </li>
            <li>
              <Link to="#">Inbox</Link>
            </li>
            <li>
              <Link to="#">Bookings</Link>
            </li>
            <li>
              <Link to="#">Trolley</Link>
            </li>
          </ul>
        </div>
        <label for="nav-toggle" class="nav-toggle-label">
          <span></span>
        </label>

      </div>
    )
  }
}
