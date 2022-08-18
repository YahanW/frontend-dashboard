import React,{useState} from "react";
import Header from "../../layout/Header";
import Footer from '../Home/homes/Footer';
import { Rate } from "antd";
import './feedback.css';

export default function MakeReview(){
    const [marks,setMarks] = useState(4.6);

    return(
        <div>
            <Header/>
            <div className="review-content">
                <div className="review-title">
                    <h3>Review for Event: </h3>
                    <h2>Establishment Ballroom Weddings </h2>
                </div>
                <div className="marking">
                    <h3>How satisfied with this event</h3>
                    <Rate defaultValue={marks}/>
                </div>
                <div className="comment">
                    <h3>Leave some comments</h3>
                    <input type='text'/>
                </div>
                <div className="uploads">
                    <h3>Upload Picture or Videos</h3>
                    <input type='file'/>
                </div>
                <div className="finish">
                    <button >SUBMIT YOUR REVIEW</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}