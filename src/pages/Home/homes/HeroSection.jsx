import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import './HeroSection.css';
import {Form, message} from 'antd';
import {Button} from './Button'
function HeroSection() {
  const history = useNavigate();
  const getEventsNormal = () =>{
   //console.log(type,date,number,budget)
   if(type!==0&&date!==""&&number!==0&&budget!==0){
    history(`/event/${type}/${date}/${number}/${budget}`);
   }else{
    message.error("please fills in the form")
   }
  }
  const [type,setType] = useState(1);
  const [date,setDate] = useState("");
  const [number,setNumber] = useState(0);
  const [budget,setBudget] = useState(0);
  const formRef=React.createRef();
  
  return (
    <div className='hero-container'>
        <h1>Event Easy</h1>
        <p>Making events easy.</p>
        <Form className='search' onFinish={getEventsNormal} ref={formRef}>
            <Form.Item>
              <select className="requires eventType"  
              onChange={(event)=>setType(event.target.value)}>
                  <option value="1">BIRTHDAYS & PRIVATE</option>
                  <option value="2">CORPORATE FUNCTIONS</option>
                  <option value="3">WEDDINGS & ENGAGEMENTS</option>
              </select>
            </Form.Item>
            <Form.Item>
              <input type='date' className='requires checkin' 
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
              onChange={(event)=>setBudget(event.target.value)} required />
            </Form.Item>
        </Form>
        <div className='twoSearch'>
          <Button type='submit' id='goResult' className='btn' 
            buttonStyle="btn--outline" buttonSize='btn--large' 
            onClick={()=>formRef.current.submit()}
          >
          Search
          </Button> 
          <a>Want Advanced Search ? Click Here</a>
        </div>     
    </div>
    
    )
}

export default HeroSection
