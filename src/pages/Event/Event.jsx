import React,{ useState,useEffect} from "react";
import Header from "../../layout/Header";
import './Event.css';
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from '../Home/homes/Footer';

export default function Event(){
const [eveList,setEveList] = useState([]);
const getEvent = async ()=>{
    const { data } = await axios.get("https://eventeasynew.azurewebsites.net/api/Event/GetAll");
    setEveList(data.$values);
    
}
useEffect(() => {
    getEvent();
  }, []);

    return (
        <div>
            <Header/>
            <div className="events">
                <ul className="eve-col">
                {
                    eveList //is there any data remains
                    ? 
                    eveList.map((ele,index)=>{
                        return (    
                            <li className="eve-row" key={index}>
                            
                                    <div className="eve-ele" key={index}>
                                    <Link className="getService" to={`/result/${ele.eventId}`}>
                                            <h3>{ele.eventName}</h3>
                                    </Link>
                                    </div>                 

                                
                            </li>
                                )
                    })
                    :
                    ''
                }       

                {/* { //abandon startegy
                    this.state.eveList.map((ele,index)=>
                    {
                        return <li className="eve-row" key={index}>
                            <div className="eve-ele" key={index}>
                                <Link className="getService" to='/result'>
                                    <h3>{ele.eventName}</h3>
                                </Link>
                            </div>
                        </li>
                    })
                }                                    */}
                </ul>    
            </div>
            <Footer/>
        </div>
    )
  
}