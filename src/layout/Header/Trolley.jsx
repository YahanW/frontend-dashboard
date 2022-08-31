import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import './style/index.css';
import axios from "axios";

export default function Trolley(){
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
    const [events,setEvents] = useState([])
    const getEvents = async()=>{
      const {data} = await axios.get(`https://eventeasyau.azurewebsites.net/api/event/geteventbyuser/${sessionStorage.getItem("id")}`)
      setEvents(data.$values)
    }
    const getEventServices = (eventId)=>{
      axios.get(`https://eventeasyau.azurewebsites.net/api/eventservice/getservicesbyevent/${eventId}`)
      .then(data=>{
        console.log(data.data.$values)
      }).catch(err=>{
        console.log(err)
      })
    }
    useEffect(()=>{
      getEvents();
    },[])

    console.log(events);
    return (
        <div>
             <a  onClick={showModalCheck} className="tro-item">ShoppingCart</a>
            <div className="cartSection">
             <Modal title="EVENT TROLLEY" mask={false} width={600} 
                     visible={isModalVisible} footer={false}onCancel={CancelCheck}
                     className="shop-list"
              >
                <ul>
                 {
                    events.map((ele,index)=>{
                        return (
                        <li>
                        <div className='avatar' onClick={()=>{setServiceVisible(true);getEventServices(ele.eventId)}}>
                            Services
                        </div>
                        <div className='left'>
                            <h3>{ele.eventName}</h3>
                            <h5>{ele.staff}</h5>
                            <h4 style={{color:ele.accept?'#B5FFD9':'red'}}>   
                            {ele.accept?'Accepted':'Waiting'}
                              </h4>
                          </div>
                          <div className='right' >
                          <button onClick={()=>sentRequest(ele.status)}>
                            {
                              ele.status?(
                                <Link to="/checkout">             
                              checkout    
                            </Link>
                              ):(
                                'Request'
                              )
                            }
                            </button>
                          </div>
                      </li>
                        )
                    })
                 }
                </ul>

               {/* Booking status ENUM 0-6
                   public enum BookingStatus
                   {
                       Processing,
                       Ready,
                       Pending,
                       Accept,
                       Decline,
                       Cancel,
                       Completed
                   }

               */}
            </Modal>
            <Modal title="Services" width={600}
                visible={isServiceVisible} footer={false} onCancel={CancelService}
                className="service-list">
                    <ul>
                        <li><div className='avatar'></div>
                        <div className='left'>
                        <h3>Service Name</h3>
                        <h4>   
                        Size
                        </h4>
                        </div>
                        <div className='right'>
                        <button>
                        
                            Remove
                        </button>
                        </div>
                    </li>
                    </ul>
            </Modal>
              
              </div>
        </div>
    )
}