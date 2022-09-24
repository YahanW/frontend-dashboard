import React, { useState, useEffect } from "react";
import './History.css';
import { Carousel } from 'antd';
import { Link, useParams,useNavigate } from 'react-router-dom';
import Navbar from "../Home/homes/Navbar";
import axios from "axios";
import { Footer } from "antd/lib/layout/layout";

function BookHsitory() {
    const { eventId } = useParams();
    const [eventService, setEventService] = useState([]);
    const [event, setEvent] = useState([]);
    const eventType = ["Wedding", "Birthday", "Business Function"];
    var price = 0;
    const history = useNavigate();
    
    const getServices = () => {
        axios.get(`https://eventeasyau.azurewebsites.net/api/eventservice/getservicesbyevent/${eventId}`)
            .then(response => {
                setEventService(response.data.$values)
                console.log(response.data.$values)
            }).catch(err => { console.log(err) })
    }
    const getEvent = () => {
        axios.get(`https://eventeasyau.azurewebsites.net/api/event/get/${eventId}`)
            .then(response => {
                setEvent(response.data)
                console.log(response.data)
            }).catch(err => { console.log(err) })
    }

    useEffect(() => {
        getServices()
        getEvent()
    }, []);

    return (
        <div>
            <Navbar />
            <div className="checkout">
                <div className="itemContainer">
                    <h1 style={{ padding: '1rem' }}>Event Detail</h1>
                    <h2 style={{ marginLeft: '1rem' }}>EVENT NAME: {event.eventName}</h2>
                    <h2 style={{ marginLeft: '1rem' }}>EVENT TYPE: {eventType[event.eventType]}</h2>
                    <h3 style={{ marginLeft: '1rem' }}>DATE & TIME: {event.startTime} - {event.endTime}</h3>
                    <Link to={`/profile/booking/review/${event.eventId}/0`}><button > Leave Bulk Review for All Services</button></Link>
                    

                    <div className="items">

                        {
                            eventService.map((ele, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <div className="icon" style={{backgroundImage:`url(${ele.services.imagePath})`}}></div>
                                        
                                        <h2 className="sname">{ele.services.serviceName}</h2>
                                        <div>
                                            <h3>Price: ${ele.services.price != null ? ele.services.price : "N/A"}</h3>
                                            <h3>Location: {ele.services.serviceLocation != null ? ele.services.serviceLocation : "1 Sandbay Road"}</h3>
                                        </div>
                                        {
                                            !ele.isReviewd?
                                                <Link to={`/profile/booking/review/${ele.eventId}/${ele.servicesId}`}><button>Write Review</button></Link>
                                                :
                                                <Link to={``}><button>View Your Review</button></Link>

                                        }
                                        

                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                

            </div>
            <Footer />
        </div>
    )
}


export default BookHsitory;