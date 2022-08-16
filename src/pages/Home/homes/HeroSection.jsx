import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import './HeroSection.css';
import {Form, message,Modal} from 'antd';
import {Button} from './Button'
function HeroSection() {
  const history = useNavigate();
  const getEventsNormal = () =>{
   //console.log(type,date,number,budget)
   if(type!==0&&date!==""&&number!==0&&budget!==0){
    history(`/event/normal/${type}/${date}/${number}/${budget}`);
   }else{
    message.error("please fills in the form")
   }
  }
  const getEventsAdvanced = () =>{
    //console.log(type,date,number,budget)
    if(type!==0&&date!==""&&number!==0&&budget!==0&&stand!==0&&seat!==0){
     history(`/event/advance/${type}/${date}/${number}/${budget}/${location}/${stand}/${seat}`);
    }else{
     message.error("please fills in the form")
    }
   }
  const [type,setType] = useState(1);
  const [date,setDate] = useState("");
  const [number,setNumber] = useState(0);
  const [budget,setBudget] = useState(0);
  const [stand,setStand] = useState(0);
  const [seat,setSeat] = useState(0);
  const [location,setLocation] = useState("");
  const formRef=React.createRef();
  const [modal2Visible, setModal2Visible] = useState(false);
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
            <Modal className='ModalSearch'
          title="Advanced Search"
          centered
          visible={modal2Visible}
          onOk={() => getEventsAdvanced()}
          onCancel={() => setModal2Visible(false)}
        >
          <div className='AdvSearch'>
            <select className="AdvEventType" 
             onChange={(event)=>setType(event.target.value)}>

              <option value="1">BIRTHDAYS & PRIVATE</option>
              <option value="2">CORPORATE FUNCTIONS</option>
              <option value="3">WEDDINGS & ENGAGEMENTS</option>
            </select>
            <input type='date' className='AdvCheckin' onChange={(event)=>setDate(event.target.value)} />
            <input type="number" className="AdvGuest" placeholder="Number of Guest" onChange={(event)=>setNumber(event.target.value)} />
            <input type='number' className='AdvBudget' placeholder="BUDGET" onChange={(event)=>setBudget(event.target.value)} />
            <label for="standAdv">stand</label>
            <select id="standAdv"
              onChange={(event)=>{setStand(event.target.value)}}>
              <option value="20">1-20</option>
              <option value="50">20-50</option>
              <option value="100">50+</option>
            </select>
            <label for="seatAdv">seat</label>
            <select id="seatAdv"
            onChange={(event)=>{setSeat(event.target.value)}}>
              <option value="20">1-20</option>
              <option value="50">20-50</option>
              <option value="100">50+</option>
            </select>
            <label for="location">seat</label>
            <select id="location"
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
