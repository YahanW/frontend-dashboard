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
  const renderSwitch = (parameter) => {
    switch (parameter) {
      case 0: return "Created"; break;  
      case 1: return "Sent"; break;     
      case 2: return "Accepted"; break; 
      case 3: return "Rejected"; break; 
      case 4: return "Cancelled"; break;
      case 5: return "AwaitPaid"; break;
      case 6: return "Paid"; break;     
      case 7: return "Completed"; break;
      default: break;
    }
  }
  useEffect(()=>{
    getHistory();
  },[])
    return (
      <div className='BookList'>
        {
          history.map((ele,index)=>{
           if(ele.bookingStatus===7){
              return (
              <div className='booking' key={index}>
              <Link className='book-link' to={`/profile/booking/details/${ele.eventId}`}>
                <h2>{ele.eventName}</h2>
                <h3>{renderSwitch(ele.bookingStatus)}</h3>
                <h4>{ele.endTime}</h4>
                <h4>Ochre Medical Centre Hobart</h4>
              </Link>
            </div>
            )}
          })
        }
       
      </div>

    )
  }


export default Booking
