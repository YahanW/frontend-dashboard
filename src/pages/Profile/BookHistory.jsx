import React,{useState,useEffect} from "react";
import './History.css';
import {Carousel} from 'antd';
import {Link,useParams} from 'react-router-dom';
import Navbar from "../Home/homes/Navbar";
import axios from "axios";

function BookHsitory(){
    const {eventId} = useParams();
    const [eventService,setEventServices] = useState([]);
    const getEventServices = (eventId) => {
        axios.get(`https://eventeasyau.azurewebsites.net/api/eventservice/getservicesbyevent/${eventId}`)
          .then(data => {
            setEventServices(data.data.$values);
            console.log(data.data.$values);
          }).catch(err => {
            console.log(err)
          })
      }
    useEffect(()=>{
        getEventServices(eventId);
    },[])

    const images = [{
        id:1,
        source:"https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },{
        source:"https://spie.org/images/Graphics/CE/DCS/2021/Special-Events-Technical-2.jpg",
        id:2,
    },{
        id:3,
        source:"https://betasmania.com.au/wp-content/uploads/2020/07/mr-i-with-mr-ii_44478028070_o-scaled-1536x810.jpg"
    }]
    const [status,setStatus] = useState(0);
    const onDisplay = () =>{
        var dot = document.getElementsByClassName("slick-dots")
        dot.innerHTML.replace("slick-active")
        console.log("clicked")
    }
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    }
    return(
        <div>
            <Navbar/>
           <div className="history-book">
           
           
                

                {
                    eventService?
                    eventService.map((ele,index)=>{
                        return (
                            <div className="history-title">
                                <h1>{ele.services.serviceName}</h1>
                                <h3>October 16,2022 9:00 AM - 7:00 PM</h3>
                            </div>   
                        )
                    }):''
                }

                
            
      <Carousel className="slide-show" autoplay dots={'false'}>

      {
            images.map((ele,index)=>{
                return  <div key={index}>
                            <h3 style={{ height: '160px',
                                lineHeight: '160px',
                                textAlign: 'center',
                                color:'white',
                                backgroundImage:`url(${ele.source}),repeat:false`,
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'cover'
                                }}  
                            >
                                {ele.id}
                            </h3>
                        </div>
            })}



      </Carousel>

            <div className="Details">
                <div className="detail">
                    <h2>Details</h2>
                    Date
                    <p>October 16</p>
                    Time
                    <p>9:00 am - 7:00 pm6</p>
                    Service Type
                    <p>Birthdat&Private</p>
                </div>
                <div className="detail">
                    <h2>Venue</h2>
                    <p>SandyBay Entertainment</p>
                    <p>1 Churchchill Ave, SandyBay TAS 7005</p>
                </div>
                <div className="detail">
                    <h2>Merchant</h2>
                    <p>LILY KID SERVICE</p>
                    Email
                    <p>Lly@gmail.com</p>
                </div>
            </div>

            {
                status==0?
                <button id='bk-cancel'>
                    <Link className="bookLink" to="/profile/booking/cancel"
                   >
                    CANCEL
                    </Link>
                </button>
                :
                <button id='bk-review'>
                    <Link className="bookLink" to="/profile/booking/review"
                    >
                    REVIEW
                    </Link>
                </button>
                // style={{backgroundColor:'brown',color:'white'}}
                // style={{backgroundColor:'rgb(196, 139, 48)',color:'white'}}
            }
            
           </div>
           
        </div>
    )
}

export default BookHsitory;