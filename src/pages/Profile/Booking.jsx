/*
This file shows booking histories

Created by Mingke Deng, and Hans Wang
Last Modified: 25/09/2022
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Booking() {
  const [history, setHistory] = useState([]);
  const getHistory = async () => {
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
      case 8: return "Review Left"; break;
      default: break;
    }
  }
  useEffect(() => {
    getHistory();
  }, [])
  return (
    <div className='BookList'>
      <table className='bookingTable'>
        <tr>
          <th>Event Name</th>
          <th>Event Status</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
        {
          history.map((ele, index) => {
            //if(ele.bookingStatus===7){
            return (
              <tr>
                <Link className='book-link' to={`/profile/booking/details/${ele.eventId}`}>

                  <td>{ele.eventName}</td>
                </Link>
                  <td>{renderSwitch(ele.bookingStatus)}</td>
                  <td>{ele.startTime}</td>
                  <td>{ele.endTime}</td>

                
              </tr>
            );
          })
        }
      </table>
    </div>
  )
}


export default Booking
