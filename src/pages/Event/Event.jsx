import React,{useState,useEffect} from "react";
import Header from "../../layout/Header";
import './Event.css';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Event(){

const [events,setEvents] = useState({list:[]})
useEffect(() => {
    fetchEvents()
    return
  },[]);
const fetchEvents = () => {
    axios.get("https://eventeasynew.azurewebsites.net/api/Event/GetAll")
	.then(response => {
        console.log(response.data)
        setEvents(response.data)
    })
}
const getEveList = () =>{
    console.log(events)
}
    return (
        <div>
            <Header/>
            <div className="events">
                <ul className="eve-col">
                    <li className="eve-row">
                    {/* {
                        events? 
                        events.map((ele,index)=>{
                        return <div key={index} className="eve-ele">
                        {ele.eventName}
                        </div>
                        })
                        :''
                    } */}
                    </li>
                    <li className="eve-row">
                        <div className="eve-ele">
                            default mode
                        </div>
                        <div className="eve-ele">
                            default mode
                        </div>
                        <div className="eve-ele">
                            default mode
                        </div>
                        <div className="eve-ele">
                            default mode
                        </div>
                    </li>
                </ul>
                <button><Link className="getService" to='/result' 
                style={{color:'#ffffff'}}
                
                >Get Services</Link></button>
                {/* <button onClick={getEveList}>Test</button> */}
            </div>
          
        </div>
    )

}