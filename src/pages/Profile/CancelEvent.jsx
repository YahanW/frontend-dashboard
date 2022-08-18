import React,{useState} from "react";
import Header from "../../layout/Header";
import Footer from '../Home/homes/Footer';

export default function CancelEvent(){
    return(
        <div>
            <Header/>
            <div className="review-content">
                <div className="review-title">
                    <h3>Cancel for Event: </h3>
                    <h3>Event Name </h3>
                </div>
            </div>
            <Footer/>
        </div>
    )
}