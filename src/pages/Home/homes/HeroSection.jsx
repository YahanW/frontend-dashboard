import React from 'react'
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
      
        <h1>Event Easy</h1>
        <p>Making events easy.</p>
      

      {/* <div className='search'>
          <select className="requires eventType" required>
              <option value="">Event Type</option>
              <option value="1">Wedding</option>
              <option value="2">Business Meeting</option>
              <option value="3">Other</option>
          </select>

          <input type='date' className='requires checkin' required />
          <input type="number" className="requires guest" placeholder="Number of Guest" required />
          <input type='number' className='requires budget' placeholder="BUDGET" required />

          
      </div>
      <Button type='submit' className='btn btnHero' buttonStyle="btn--outline" buttonSize='btn--large' onClick={onLogCheck}>
        Search
      </Button>
      <a>Want Advanced Search ? Click Here</a> */}
    </div>
    
    )
      {/* <div className='hero-btns'>
        <Button className='btns' buttonStyle="btn--outline" buttonSize='btn--large'>
            Get Started
        </Button>
        <Button className='btns' buttonStyle="btn--primary" buttonSize='btn--large'>
            Watch Trailer <i className='far fa-play-circle' />       
        </Button>
      </div>  */}
   
  
}

export default HeroSection
