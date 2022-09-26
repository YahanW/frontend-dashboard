/*
This file displays the section that user do the 
search function. 

Created by Mingke Deng, and Hans Wang
Last Modified: 23/09/2022
*/
import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import './HeroSection.css';
import {Form, message,Modal,DatePicker} from 'antd';
import {Button} from './Button'
function HeroSection() {
  const history = useNavigate();
  const getEventsNormal = () =>{
    let dateNow = new Date().toISOString().split("T")[0]
    if(date>=dateNow){
      if(type!==-1&&date!==""&&number>>0&&budget>>0){
        history(`/venue/normal/${type}/${date}/${number}/${budget}`);
      }else{
        message.error("please fills in the form with appropriate values")
      }
    }else{
      message.error("please select a date from today")
    }
  }
  const getEventsAdvanced = () =>{
    let dateNow = new Date().toISOString().split("T")[0]
    if (date >= dateNow)
    {
      console.log(date,number,budget,stand,seat)
      if(date!==""&&number>>0&&budget>>0&&stand>>0&&seat>>0){
        history(`/venue/advance/${type}/${date}/${number}/${budget}/${location}/${stand}/${seat}`);
      }else{
        message.error("please fills in the form with appropriate values")
      }
    } else {
      message.error("please select a date from today")
    }
   }
  const [type,setType] = useState(0);
  const [date,setDate] = useState(Date.now());
  const [number,setNumber] = useState(0);
  const [budget,setBudget] = useState(0);
  const [stand,setStand] = useState(0);
  const [seat,setSeat] = useState(0);
  const [location,setLocation] = useState("Hobart");
  const formRef=React.createRef();
  const [modal2Visible, setModal2Visible] = useState(false);

  return (
    <div className='hero-container'>
        <h1>Event Easy</h1>
        <p>Making events easy.</p>
        <Form className='search' onFinish={getEventsNormal} ref={formRef}>
            <Form.Item>
              <select className="requires eventType" onChange={(event)=>setType(event.target.value)}>
                  <option value="1">BIRTHDAYS & PRIVATE</option>
                  <option value="2">CORPORATE FUNCTIONS</option>
                  <option value="3">WEDDINGS & ENGAGEMENTS</option>
              </select>
            </Form.Item>
            <Form.Item>
              <input type="date"  className='requires checkin' 
              onChange={(event)=>setDate(event.target.value)}/>
            </Form.Item>
            <Form.Item>
              <input type="number" className="requires guest" 
              placeholder="Number of Guest" 
              onChange={(event)=>setNumber(event.target.value)}/>
            </Form.Item>
            <Form.Item>
              <input type='number' className='requires budget' 
              placeholder="BUDGET" 
              onChange={(event)=>setBudget(event.target.value)} />
            </Form.Item>
        </Form>
        <div className='twoSearch'>
          <Button type='submit' id='goResult' className='btn' 
            buttonStyle="btn--outline" buttonSize='btn--large' 
            onClick={()=>formRef.current.submit()}
          >
          Search
          </Button> 

         {/* advanced search  */}
          <a onClick = {() => setModal2Visible(true)} >Want Advanced Search ? Click Here</a> 
            <Modal className='ModalSearch'title="Advanced Search"centered visible={modal2Visible}
          onOk={() => getEventsAdvanced()} onCancel={() => setModal2Visible(false)}
        >
          <div className='AdvSearch'>
            <label for="type-adv">Event Type</label>
            <select className="AdvEventType" id="type-adv"
             onChange={(event)=>setType(event.target.value)}>

              <option value={0}>BIRTHDAYS & PRIVATE</option>
              <option value={1}>CORPORATE FUNCTIONS</option>
              <option value={2}>WEDDINGS & ENGAGEMENTS</option>
            </select>
            <label for="date-adv">Start Date</label>
            <input type='date' className="AdvEventType" id="date-adv" onChange={(event)=>setDate(event.target.value)} />
            <label for="guest-adv">Guests</label>
            <input type="number" id="guest-adv" className="AdvEventType" placeholder="Number of Guest" onChange={(event)=>setNumber(event.target.value)} />
            <label for="buget-adv">Max Buget</label>
            <input type='number' className="AdvEventType" id="buget-adv" placeholder="BUDGET" onChange={(event)=>setBudget(event.target.value)} />
            <label for="standAdv">STAND</label>
            <input className="AdvEventType"id="standAdv"
              onChange={(event)=>{setStand(event.target.value)}}/>
            <label for="seatAdv">SEAT</label>
            <input className="AdvEventType" id="seatAdv"
            onChange={(event)=>{setSeat(event.target.value)}}/>
            <label for="location">LOCATION</label>
            <select className="AdvEventType" id="location"
            onChange={(event)=>{setLocation(event.target.value)}}>
              <option value="Hobart">Hobart</option>
              <option value="SandyBay">SandyBay</option>
              <option value="Kinston">Kinston</option>
              <option value="NewTown">NewTown</option>
              <option value="South Hobart">South Hobart</option>
              <option value="North Hobart">North Hobart</option>
            </select>
          </div>
        </Modal>
        </div>     
    </div>
    
    )
}

export default HeroSection
