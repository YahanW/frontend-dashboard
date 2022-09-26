/*
This file write review and send to the service

Created by Mingke Deng, and Hans Wang
Last Modified: 25/09/2022
*/
import React, { useState, useEffect } from "react";
import Footer from '../Home/homes/Footer';
import { Rate, message,Input } from "antd";
import './feedback.css';
import Navbar from "../Home/homes/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MakeReview() {
    const { sId } = useParams();
    const { eventId } = useParams();
    const [event, setEvent] = useState([]);
    const [review, setReview] = useState({
        rate: 0,
        description: '',
        servicesId: sId,
        eventId: eventId,
        userId: sessionStorage.getItem("id"),
        date: new Date().toISOString().split("T")[0],
        Anonymous: false
    })
    const history = useNavigate();
    const getEvent = async () => {
        const { data } = await axios.get(`https://eventeasyau.azurewebsites.net/api/event/get/${eventId}`);
        ///setEvent(data.$values)
        setEvent(data)
        console.log(data);
    }
    const submitReview = async () => {
        if (sId == 0) {
            var temp = review;

            //bulk review
            axios.get(`https://eventeasyau.azurewebsites.net/api/eventservice/getservicesbyevent/${eventId}`)
                .then( res =>  {
                    //console.log("service list", res.data.$values); //get all services
                    
                    res.data.$values.forEach(async service => {
                        //setReview({ ...review, servicesId: service.servicesId });
                        temp.servicesId = service.servicesId;
                        //console.log("review", temp.servicesId);
                        await axios.post('https://eventeasyau.azurewebsites.net/api/reviews/postreview', temp)
                        .catch(err=>{console.log(err)})
                        //axios.put(`https://eventeasyau.azurewebsites.net/api/services/update/${service.servicesId}`, {"isReviewed": true })
                    })
                    
                }).then(
                    //axios.put(`https://eventeasyau.azurewebsites.net/api/services/update/${servicesId}`, {"isReviewed": true }).then(
                    res => {
                        //console.log(res);
                        message.success('Review Success');
                        history(-1);
                    }
                    //)
                )
            //const allServices = [];
            //allServices.push()
            axios.post('https://eventeasyau.azurewebsites.net/api/reviews/postreview', review)

        }
        else {
            console.log("serviceId not equals 0", sId);
            console.log("review",review)
            //single review
            axios.post('https://eventeasyau.azurewebsites.net/api/reviews/postreview', review).then(
                //axios.put(`https://eventeasyau.azurewebsites.net/api/services/update/${servicesId}`, {"isReviewed": true }).then(
                res => {
                    //console.log(res);
                    message.success('Review Success');
                    history(-1);
                }
                //)
            )
        }
    }

    useEffect(() => {
        getEvent();
    }, [])
    return (
        <div>
            <Navbar />
            <div className="review-content">
                {
                    event ?

                        <div className="review-title">
                            <h3>Review for Event: </h3>
                            <h2>{event.eventName}</h2>
                        </div>

                        :
                        console.log(typeof event)

                }
                <div className="marking">
                    <h3>How satisfied with this event</h3>
                    {/* { } */}
                    <Rate onChange={e => {setReview({ ...review, rate: e})} }/>
                </div>
                <div className="comment">
                    <h3>Leave some comments</h3>
                    <textarea col="20" row="10" type='text' onChange={e => setReview({ ...review, description: e.target.value })} />
                </div>
                <div className="uploads">
                    <h3>Upload Picture or Videos <p>(function coming soon)</p></h3>
                </div>
                <div className="finish">
                    <button onClick={submitReview}>SUBMIT YOUR REVIEW</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
