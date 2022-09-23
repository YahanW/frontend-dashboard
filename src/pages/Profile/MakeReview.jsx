import React, { useState, useEffect } from "react";
import Footer from '../Home/homes/Footer';
import { Rate, message } from "antd";
import './feedback.css';
import Navbar from "../Home/homes/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MakeReview() {
    const { servicesId } = useParams();
    const { eventId } = useParams();
    const [event, setEvent] = useState([]);
    const [review, setReview] = useState({
        rate: 0,
        description: '',
        servicesId: servicesId,
        eventId: eventId,
        userId: sessionStorage.getItem("id")
    })
    const history = useNavigate();
    const getEvent = async () => {
        const { data } = await axios.get(`https://eventeasyau.azurewebsites.net/api/event/get/${eventId}`);
        ///setEvent(data.$values)
        setEvent(data)
    }
    const submitReview = () => {
        axios.post('https://eventeasyau.azurewebsites.net/api/reviews/postreview', review).then(
            //axios.put(`https://eventeasyau.azurewebsites.net/api/services/update/${servicesId}`, {"isReviewed": true }).then(
                res => {
                    console.log(res);
                    message.success('Review Success');
                    history(-1);
                }
            //)
        )
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
                    <Rate defaultValue={0} onChange={e => setReview({ ...review, rate: e.target.value })} />
                </div>
                <div className="comment">
                    <h3>Leave some comments</h3>
                    <input type='text' onChange={e => setReview({ ...review, description: e.target.value })} />
                </div>
                <div className="uploads">
                    <h3>Upload Picture or Videos <p>function coming soon</p></h3>
                </div>
                <div className="finish">
                    <button onClick={submitReview}>SUBMIT YOUR REVIEW</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
