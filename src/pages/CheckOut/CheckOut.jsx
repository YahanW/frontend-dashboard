import React,{useState} from "react";
import './checkout.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Header from "../../layout/Header";
import Footer from '../Home/homes/Footer';
import Navbar from "../Home/homes/Navbar";
function CheckOut(){
    const services = [
        {
        name:"SOLO Pizza",
        startTime:9,
        endTime:13,
        qutity:1,total:30}, 
        {
        name:"Dancing",
        startTime:9,
        endTime:13,
        qutity:1,total:100}]
return (
        <div>
            <Navbar/> 
            <div className="checkout">
                <div className="itemContainer">
                    <h1 style={{padding:'1rem'}}>CHECK OUT</h1>
                    <h2 style={{marginLeft:'1rem'}}>EVENT NAME: Corporate Feast</h2>
                    <h4 style={{marginLeft:'1rem'}}>event type: Corporate function</h4>
                    <h2 style={{marginLeft:'1rem'}}>DATE: 19/08/2022</h2>
                        
                        <div className="serList">
                           
                          {
                            services.map((ele,index)=>{
                                return(
                                    <div className="service" key={index}>
                                        <div className="icon">
                                        </div>
                                        <div className="left">
                                            <h2 className="sname">Service Name {ele.name}</h2>
                                            <div className="detail">
                                                <h3>Order Period: {ele.startTime}-{ele.endTime} O'Clock  </h3>
                                                <h3>  Quantity: {ele.qutity}</h3>
                                                <h3>Price: {ele.total}</h3>
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
                                                value: "100",
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
            <Footer/>
        </div>
        )
}
export default CheckOut;