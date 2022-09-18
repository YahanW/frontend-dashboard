import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Booking(){
  const [history,setHistory] = useState([]);
  const getHistory = async ()=>{
    const { data } = await axios.get(`https://eventeasyau.azurewebsites.net/api/event/getactiveeventbyuser/${sessionStorage.getItem("id")}`)
    setHistory(data.$values);
    console.log(data.$values);
    
  }
  useEffect(()=>{
    getHistory();
  },[])
    return (
      <div className='BookList'>
        {
          history.map((ele,index)=>{
            return (
              <div className='booking'>
              <Link className='book-link' to={`/profile/booking/details/${ele.eventId}`}>
                <h2>{ele.eventName}</h2>
                <h3>{ele.bookingStatus}</h3>
                <h4>{ele.endTime}</h4>
                <h4>Ochre Medical Centre Hobart</h4>
              </Link>
            </div>
            )
          })
        }
       
      </div>

    )
  }


export default Booking
