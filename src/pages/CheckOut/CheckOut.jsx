import React,{useState} from "react";
import './checkout.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Header from "../../layout/Header";
import Footer from '../Home/homes/Footer';
function CheckOut(){
return (
        <div>
            <Header/> 
            <div className="checkout">
                    <div className="itemContainer">
                        <h1>CHECK OUT</h1>
                        <h2>EVENT NAME: HOT STAR</h2>
                        <h2>EVENT TYPE</h2>
                        <h2>DATE 19/08/2022</h2>
                        <div className="serList">
                           
                            <div className="service">
                                <div className="sname">
                                    <h2>Service Name service name</h2>
                                    <button>remove</button>
                                </div>
                                <div className="select">
                                    <h2>Selections selection name</h2>
                                    <button>remove</button>
                                </div>
                            </div>
                           
                        </div>
                    </div>
           
                       <PayPalScriptProvider options={{ "client-id": "test" }}>
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
            <Footer/>
        </div>
        )
}
export default CheckOut;