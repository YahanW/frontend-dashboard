import React from 'react'
import Header from '../../layout/Header'
import './Result.css';
import {useState,useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

import Footer from '../Home/homes/Footer';

function Result() {
  const {eventId} = useParams();
  const results = [
    {
    image:"https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=PA1-3CnCcy-HwYCSsVvTOw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=123.645096&pitch=0&thumbfov=100",
    title:"Book a skin check – it could even save your life!",
    address:"232 Liverpool St, Hobart TAS 7000",
    merchant:"Ochre Medical Centre Hobart",
    avatar:"https://cpp-prod-seek-company-image-uploads.s3.ap-southeast-2.amazonaws.com/813527/logo/653c2e81-bcca-11ea-86d1-e52bae5cc086.png",
    star:"https://alacritas.cis.utas.edu.au/~mingked/kit301/PNGs/rating.png",
    average:"$169",
    score:'4.7'
    },
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSECYa_ZeDH5A8PgGHsRuMn22d7Z79rluJE5BHaLPuwcq8oMv4_vOymZ6GqXuoPCEWtAo&usqp=CAU",
      title:"LONGFORD HILL ST GROCER",
      address:"7 Wellington St, Longford",
      merchant:"Van Diemens Land Creamery",
      avatar:"data:image/png;base64,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",
      star:"https://alacritas.cis.utas.edu.au/~mingked/kit301/PNGs/rating.png",
      average:"$49",
      score:'4.7'
    }
  ]
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(`https://eventeasynew.azurewebsites.net/api/ServicePackages/GetServicePackageDetail/${eventId}`);
    //setData(response);
    setData(data.$values)
  };
  useEffect(() => {
    getData();
    
  }, []);

  console.log(data)
  
    return (
      <div className='result'>
        {/**Navbar */}
        <Header/> 
        <div className='event-intro'>
          <div className='intro-img'>
            {/* {
              data[0]?
              data[0].map((ele,index)=>{
                return (
                  <div>
                    <h2>{ele.packageName}</h2>
                    <h3>PRICES START AT ${ele.eventService.budget/ele.eventService.guestAmount*10} PP</h3>
                    <button className='create-event'>CREATE EVENT</button> 
                  </div>
                )
              })
              :''
            } */}
          </div>
          <div className='intro-list'>
            <div className='list-locate'>
              <h2>Location</h2>
              <h3>320 George Street, Sydney, New South Wales, Australia </h3>
            </div>
            <div className='list-locate'>
              <h2>Contact Us</h2>
              <h3>Bookings & Enquiries +61 2 9114 7360 </h3>
            </div>
            <div className='list-locate'>
              <h2>Services & Facilities</h2>
              <h3>In-house visual styling and florist, Full AV support, Wi-Fi, Outdoor terrace </h3>
            </div>
            <div className='list-locate'>
              <h2>Capacity</h2>
              <h3>Cocktail: 1000 Banquet: 400 Wedding: 372</h3>
            </div>
          </div>
          <div className='divider'></div>
          <div className='intro-desc'>
          A grand, sweeping space that rises to every occasion, in the heart of the CBD.
          </div>
        </div>
        <div className='itemList'> {/**Item Results*/}
           {
                data.map((ele,index)=>{
                  return  (
                    <div className='item'>
                      <div className='item-left'
                      style={{backgroundImage:`url("https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=PA1-3CnCcy-HwYCSsVvTOw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=123.645096&pitch=0&thumbfov=100")`}}>
                      </div>
                      <div className='item-right'>
                        <h2><Link to={`/result/details/${ele.eventService.eventServiceId}`}>{ele.eventService.serviceName}</Link></h2>
                        <h4>{ele.eventService.location}</h4>
                        <div className='merchant'>
                          <h3>{ele.eventService.merchant}</h3>
                          <div className='avatar'
                          style={{backgroundImage:`url("https://cpp-prod-seek-company-image-uploads.s3.ap-southeast-2.amazonaws.com/813527/logo/653c2e81-bcca-11ea-86d1-e52bae5cc086.png")`}}></div>
                        </div>
                    </div>
                  {/**very right side for marking*/}
                    <div className='item-star'>
                      <div className="star" 
                      style={{backgroundImage:`url("https://alacritas.cis.utas.edu.au/~mingked/kit301/PNGs/rating.png")`}}
                    
                      >
                     
                        <h2>{ele.eventService.rate}</h2></div>
                      <h4>average price</h4>
                      <h3>{ele.eventService.budget}</h3>
                    </div>
                </div>
                )})
            }
        </div>
        <Footer/>
      </div>
    )
}

export default Result