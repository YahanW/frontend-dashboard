import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Modal} from "antd";
import './style/index.css';
import axios from "axios";

export default function ShoppingCart(){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModalCheck = () => {setIsModalVisible(true);};
    const CancelCheck = () => {setIsModalVisible(false);};
    const [isServiceVisible, setServiceVisible] = useState(false);
    const CancelService = () => {setServiceVisible(false);};
    const sentRequest = (isAccept)=>{
        if(isAccept===false){
            console.log("Make request")
        }
    }
    const [eventServices,setEventServices] = useState([])
    const [events,setEvents] = useState([])
    const getEvents = async()=>{
      const {data} = await axios.get(`https://eventeasyau.azurewebsites.net/api/event/geteventbyuser/${sessionStorage.getItem("id")}`)
      setEvents(data.$values)
    }
    const getEventServices = (eventId)=>{
      axios.get(`https://eventeasyau.azurewebsites.net/api/eventservice/getservicesbyevent/${eventId}`)
      .then(data=>{
        setEventServices(data.data.$values);
        console.log(data.data.$values);
      }).catch(err=>{
        console.log(err)
      })
    }
    useEffect(()=>{
      getEvents();
    },[])

    console.log(events);
    return (
        <div className='nav-links'>
             <a  onClick={showModalCheck} className="tro-item">Shopping Cart</a>
            <div className="cartSection">
             <Modal title="EVENT TROLLEY" mask={false} width={600} 
                     visible={isModalVisible} footer={false}onCancel={CancelCheck}
                     className="shop-list"
              >
                <ul>
                 {
                    events.map((ele,index)=>{
                        // if(ele.status==0||ele.status==1||ele.status==2||ele.status==3){
                          return (
                            <li>
                            <div className='avatar' onClick={()=>{getEventServices(ele.eventId);setServiceVisible(true);}}>
                                Services
                            </div>
                            <div className='left'>
                                <h3>{ele.eventName}</h3>
                                <h5>{ele.staff}</h5>
                                <h4 style={{color:ele.status==2?'#B5FFD9':'red'}}>   
                                {ele.status==0?'Init':
                                  (ele.status==1?'Waiting':
                                    (ele.status==2?'Accpeted':'No status'))}
                                    
                                  </h4>
                              </div>
                              <div className='right' >
                              <button onClick={()=>sentRequest(ele.status)}>
                                {
                                  ele.status==2?(
                                    <Link to="/checkout">             
                                  checkout    
                                </Link>
                                  )
                                  :(
                                    'Request'
                                  )
                                }
                                </button>
                                <button disabled={ele.status>=2?true:false}>
                                  Cancel
                                </button>
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


            <Modal title="Services" width={600}
                visible={isServiceVisible} footer={false} onCancel={CancelService}
            className="service-list"> 
                    <ul>
                      {
                        eventServices?
                        eventServices.map((ele,index)=>{
                          return (
                            <li><div className='avatar'></div>
                          <div className='left'>
                        <h3>Service Name</h3>
                        <h4>{ele.servicesId}</h4>
                        </div>
                        <div className='right'>
                        <button>Remove</button>
                        </div>
                    </li>
                          )
                        })
                        :''
                      }
                  </ul>
            </Modal>
              
              </div>
        </div>
    )
}