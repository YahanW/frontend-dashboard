import React,{useState} from "react";
import Header from "../../layout/Header";
import Footer from '../Home/homes/Footer';
import Navbar from "../Home/homes/Navbar";
import './feedback.css';

export default function CancelEvent(){
    return(
        <div>
            <Navbar/>
            <div className="review-content">
                <div className="review-title">
                    <h3>Cancel for Event: </h3>
                    <h2>Establishment Ballroom Weddings </h2>
                </div>
                <div className="comment">
                    <h3>Reason of Cancellation Event</h3>
                    <input type='text'/>
                </div>
                <div className="uploads">
                    <h3>Upload Picture or Videos</h3>
                    <input type='file'/>
                </div>
                <div className="finish">
                    <button >Confirm Cancellation</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}