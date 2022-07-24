import React from 'react'
import { Button } from './Button'
import './HeroSection.css'
import './home.css'
import {Link} from 'react-router-dom'
import {Modal} from 'antd'
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const history = useNavigate();

  const onLogCheck = () =>{
   
   if(!sessionStorage.getItem('token'))
   {
    Modal.confirm({
      //a pop up window
      title:'Login Required',
      content:'Please To Login or Signup before make a Search!!!',
      onOk:()=>{ 
        history("/")
      }
      })
    }else{
        history("/result")
    }
    return
  }
  return (
    <div className='hero-container'>
      <video src='https://alacritas.cis.utas.edu.au/~mingked/kit301/Video/video-3.mp4' autoPlay loop muted />
      <h1>Event Easy</h1>
      <p>Making events easy.</p>
      <div className='search'>
          <select className="eventType" id="eventType" required>
              <option value="">Event Type</option>
              <option value="1">Wedding</option>
              <option value="2">Business Meeting</option>
              <option value="3">Other</option>
          </select>

          <input type='date' id='checkin' className='checkin' required />
          <input type="number" className="guest" id="Number of Guests" placeholder="Number of Guest" required />
            
          <Button type='submit' 
          className='btn' buttonStyle="btn--outline" buttonSize='btn--large'
          onClick={onLogCheck}
          >
            Search
          </Button>
      </div>
      {/* <div className='hero-btns'>
        <Button className='btns' buttonStyle="btn--outline" buttonSize='btn--large'>
            Get Started
        </Button>
        <Button className='btns' buttonStyle="btn--primary" buttonSize='btn--large'>
            Watch Trailer <i className='far fa-play-circle' />       
        </Button>
      </div> */}
    </div>
  )
}

export default HeroSection
