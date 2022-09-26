/*
This file needs a purpose

Created by Mingke Deng, and Hans Wang
Last Modified: 25/09/2022
*/
import axios from "axios";
import React, { useState } from "react";
import Footer from '../Home/homes/Footer';
import Navbar from "../Home/homes/Navbar";
import './sampleEvent.css';

export default function CancelEvent() {

    return (
        <div>
            <Navbar />
            <div className="sample-content">
                <div className="sample-title">
                    <h2>Ross and Rachael's Sunset Wedding</h2>
                </div>
                <div className="sample-1">
                    <div className="sample-background1" />
                    <div className="sample-service">
                        <div className="sample-service-background" />
                        <div className="sample-service-detail">
                            <h2>Services Providers: </h2>
                            <h3>Venue and Catering: The Sebel Melbourne Ringwood</h3>
                            <h3>Host: James</h3>
                            <h3>Wedding Dress: Abti Da Sposa -presented by VOGUE</h3>
                            <h3>Photography: DreamLife</h3>
                        </div>
                    </div>
                    <div className="sample-fac">
                        
                        <div className="sample-fac-detail">
                            <h2>Facilities Booked:</h2>
                            <h3>General Facilities: Bar, Breakout Rooms, Foyer, Function Rooms, Outdoor Facilities, Restaurant</h3>
                            <h3>Catering Options: Buffets, Canapes, Plated, Platters</h3>
                            <h3>Audio Visual Equipment: Data Projector, Flip Chart, Lectern, Microphone, Photocopier, Screen, Sound System, Television, Whiteboard, Wifi Internet</h3>
                        </div>
                        <div className="sample-fac-background" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}