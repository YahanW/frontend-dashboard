import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal,message } from "antd";
import './style/index.css';
import axios from "axios";
import { render } from "@testing-library/react";

export default function ShoppingCart() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModalCheck = () => { setIsModalVisible(true); };
  const CancelCheck = () => { setIsModalVisible(false); };
  const [isServiceVisible, setServiceVisible] = useState(false);
  const CancelService = () => { setServiceVisible(false); };
  const [sends,setSends] = useState({bookingStatus:1});
  const [init,setInit] = useState({bookingStatus:0});
  const sType = ["Venue",
                  "Food",
                  "Beverage",
                  "Entertainment",
                  "Florist",
                  "Photographer",
                  "Power",
                  "Network",
                  "Music",
                  "Security",
                  "Restroom",
                  "CarPark",
                  "Waiter",
                  "Transport",
                  "Taxi",
                  "Firework"];
  const sentRequest = (ele) => {
    axios.get(`https://eventeasyau.azurewebsites.net/api/user/sendmail/${ele.staffId}`)
    .then(axios.put(`https://eventeasyau.azurewebsites.net/api/event/update/${ele.eventId}`,sends))
        .then(response=>{
            console.log(response)
            message.success('Request has been sent');
            CancelCheck();
        }).catch(err=>{
            console.log(err)
        })
  }
  const cancelEvent = (ele) => {
    axios.put(`https://eventeasyau.azurewebsites.net/api/event/update/${ele.eventId}`,init)
        .then(response=>{
            console.log(response)
            message.success('Request has been cancelled');
            CancelCheck();
        }).catch(err=>{
            console.log(err)
        })
  }

 
  const [eventServices, setEventServices] = useState([])
  const [events, setEvents] = useState([])
  const getEvents = async () => {
    const { data } = await axios.get(`https://eventeasyau.azurewebsites.net/api/event/getactiveeventbyuser/${sessionStorage.getItem("id")}`)
    setEvents(data.$values)
    console.log(data.$values)
    
  }
  const getEventServices = (eventId) => {
    axios.get(`https://eventeasyau.azurewebsites.net/api/eventservice/getservicesbyevent/${eventId}`)
      .then(data => {
        setEventServices(data.data.$values);
        console.log(data.data.$values);
      }).catch(err => {
        console.log(err)
      })
  }

  const renderSwitch = (parameter) => {
    switch (parameter) {
      case 0: return "Created"; break;  
      case 1: return "Sent"; break;     
      case 2: return "Accepted"; break; 
      case 3: return "Rejected"; break; 
      case 4: return "Cancelled"; break;
      case 5: return "AwaitPaid"; break;
      case 6: return "Paid"; break;     
      case 7: return "Completed"; break;
      default: break;
    }
  }
  const requestSwitch = (parameter) => {

    switch (parameter.bookingStatus) {
      case 0: return <button onClick={()=>{sentRequest(parameter)}}>Send Request</button>; break;    // request 
      case 1: return <button onClick={()=>{cancelEvent(parameter)}}>Cancel</button>; break;       // cancel 
      case 2: return <button onClick={console.log("checkout")}>
       <Link to={`/checkout/${parameter.eventId}`} style={{color:'#ffffff'}}>Checkout</Link></button>; break;   // checkout
      case 3: return <p>No Action</p>; break;   // no use
      case 4: return <p>No Action</p>; break;  // no use
      case 5: return <button onClick={console.log("checkout")}>
      <Link to='/checkout' style={{color:'#ffffff'}}>Checkout</Link></button>; break;  // checkout
      case 6: return <p>No Action</p>; break;       // no use
      case 7: return <p>No Action</p>; break;  // no use
      default: break;
    }
  }
  useEffect(() => {
    getEvents();
  }, [])

  //console.log(events);
  return (
    <div className='nav-links'  onClick={()=>{getEvents()}}>
      <a onClick={showModalCheck} className="tro-item">Shopping Cart</a>
      <div className="cartSection">
        <Modal title="EVENT TROLLEY" mask={false} width={950}
          visible={isModalVisible} footer={false} onCancel={CancelCheck}
          className="shop-list"
        >
          <ul>
            {
              events.map((ele, index) => {
                // if(ele.status==0||ele.status==1||ele.status==2||ele.status==3){
                return (
                  <li >
                    <div className='avatar' onClick={() => { getEventServices(ele.eventId); setServiceVisible(true); }}>
                      Services
                    </div>
                    <div className='left'>
                      <h3 onClick={() => { getEventServices(ele.eventId); setServiceVisible(true); }}>{ele.eventName}</h3>
                      {/* <h5>{ele.staff}</h5> */}
                      <h4 style={{ color: ele.bookingStatus == 2 ? 'green' : 'red' }}>
                        {
                          renderSwitch(ele.bookingStatus)
                        }
                      </h4>
                    </div>
                    <div className='right' >
                        {
                          requestSwitch(ele)
                        }
                    </div>
                  </li>
                )
                //}
                // else{
                //   return null
                // }
              })
            }
          </ul>
        </Modal>


        <Modal title="Services" width={850}
          visible={isServiceVisible} footer={false} onCancel={CancelService}
          className="service-list">
          <ul>
            {
              eventServices.length!==0 ?
                eventServices.map((ele, index) => {
                  return (
                    <li><div className='avatar'></div>
                      <div className='left'>
                        <h3>{ele.services.serviceName}</h3>
                        <h4>{sType[ele.services.serviceType]}</h4>
                        <h4>Price: ${ele.services.price}</h4>
                      </div>
                      <div className='right'>
                        <button>Remove</button>
                      </div>
                    </li>
                  )
                })
                :  
                // 请在这里写一个path, 引导用户到service列表
                  <li className="addService">
                    <div>
                        <h2>You have no services in your cart</h2><br/>
                    </div>
                    <div>
                        <Link to="/result/empty">Click here to browse services</Link>
                    </div>
                  </li>
            }
          </ul>
        </Modal>

      </div>
    </div>
  )
}