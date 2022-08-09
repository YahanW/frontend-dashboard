import React from 'react'
import {Modal} from 'antd'
import { useNavigate } from "react-router-dom";
import {Button} from './Button'
import './HeroSection.css'
function HeroSection() {
  const history = useNavigate();
  const onLogCheck = () =>{
    history("/result")
    return
  }
  // const [searchVisible, setSearchVisible] = useState(false);

  // const CancelAdvance = () =>{
  //   setSearchVisible(false)
  // }
  return (
    <div className='hero-container'>
      
        <h1>Event Easy</h1>
        <p>Making events easy.</p>
      

        <div className='search'>
          <select className="requires eventType" required>
              
              <option value="1">BIRTHDAYS & PRIVATE</option>
              <option value="2">CORPORATE FUNCTIONS</option>
              <option value="3">WEDDINGS & ENGAGEMENTS</option>
          </select>
          <input type='date' className='requires checkin' required />
          <input type="number" className="requires guest" placeholder="Number of Guest" required />
          <input type='number' className='requires budget' placeholder="BUDGET" required />
         
        </div>
       
        <div className='twoSearch'>
            <Button type='submit' id='goResult' className='btn' buttonStyle="btn--outline" buttonSize='btn--large' onClick={onLogCheck}>
            Search
            </Button>
            <a >Want Advanced Search ? Click Here</a> 
        </div>
        {/* <Modal title="MESSAGE LIST" mask={false}
                   visible={searchVisible} footer={false} onCancel={CancelAdvance}
                   className="msg-list">
                  <div onClick={showModalChat} style={{cursor:'pointer'}}>
                    <h2>Pelosi</h2>
                    <h4 style={{backgroundColor:'#FFEAC9'}}>Hi, There</h4>
                  </div>
        </Modal> */}
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
