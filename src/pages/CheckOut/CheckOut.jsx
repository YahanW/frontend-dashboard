import React, { useEffect, useState } from "react";
import './checkout.css';
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Header from "../../layout/Header";
import Footer from '../Home/homes/Footer';
import Navbar from "../Home/homes/Navbar";
import axios from "axios";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";


function CheckOut() {
    const { eventId } = useParams();
    const [eventService, setEventService] = useState([]);
    const [event, setEvent] = useState([]);
    const eventType = ["Wedding","Birthday", "Business Function"];
    var price = 0;
    
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
                    <h1 style={{ padding: '1rem' }}>CHECK OUT</h1>

                    <h1 style={{ marginLeft: '1rem' }}>EVENT NAME: {event.eventName}</h1>
                    <h1 style={{ marginLeft: '1rem' }}>EVENT TYPE: {eventType[event.eventType]}</h1>
                    <h3 style={{ marginLeft: '1rem' }}>DATE & TIME: {event.startTime} - {event.endTime}</h3>

                    <div className="serList">

                        {
                            eventService.map((ele, index) => {
                                price += ele.services.price;
                                return (
                                    <div className="service" key={index}>
                                        <div className="icon">
                                        </div>
                                        <div className="left">
                                            <h2 className="sname">{ele.services.serviceName}</h2>
                                            <div className="detail">
                                                {/* <h3>  Quantity: 1</h3> */}
                                                <h3>Price: ${ele.services.price!=null?ele.services.price:"N/A"}</h3>
                                            
                                                {/* <button>remove</button> */}
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="paypalContainer">
                    <div className="totalPrice">
                        <h2>Total: ${`${price}`} AUD</h2>
                    </div>
                    <PayPalScriptProvider options={{currency:"AUD","client-id": "test",}}>
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: price,
                                                
                                            } 
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    const name = details.payer.name.given_name;
                                    alert(`Transaction completed by ${name}`);
                                });
                            }}
                        />
                    </PayPalScriptProvider>
                </div>

            </div>
            <Footer />
        </div>
    )
}
export default CheckOut;