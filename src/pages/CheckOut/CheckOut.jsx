import React, { useEffect, useState } from "react";
import './checkout.css';
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Header from "../../layout/Header";
import Footer from '../Home/homes/Footer';
import Navbar from "../Home/homes/Navbar";
import axios from "axios";


function CheckOut() {
    const { eventId } = useParams();
    const [eventService, setEventService] = useState([]);

    const getServices = async () => {
        const { data } = await
            axios.get(`https://eventeasyau.azurewebsites.net/api/eventservice/getservicesbyevent/${eventId}`);
        console.log(data)
        return data.$values
    }

    useEffect(() => {
        getServices().then((eventService) => setEventService(eventService))
    }, []);

    return (
        <div>
            <Navbar />
            <div className="checkout">
                <div className="itemContainer">
                    <h1 style={{ padding: '1rem' }}>CHECK OUT</h1>

                    <h2 style={{ marginLeft: '1rem' }}>EVENT NAME: Corporate Feast</h2>
                    <h4 style={{ marginLeft: '1rem' }}>event type: Corporate function</h4>
                    <h2 style={{ marginLeft: '1rem' }}>DATE: 19/08/2022</h2>

                    <div className="serList">

                        {
                            eventService.map((ele, index) => {
                                return (
                                    <div className="service" key={index}>
                                        <div className="icon">
                                        </div>
                                        <div className="left">
                                            <h2 className="sname">Service Name {ele.services.serviceName}</h2>
                                            <div className="detail">
                                                <h3>Order Period: {ele.services.startTime}-{ele.services.endTime} </h3>
                                                <h3>  Quantity: 1</h3>
                                                <h3>Price: {ele.services.price}</h3>
                                                <button>remove</button>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="paypalContainer">
                    <PayPalScriptProvider>
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: `${eventId}`,
                                            },
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