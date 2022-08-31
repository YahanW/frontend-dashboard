import React from 'react';
import Header from '../../layout/Header';
import './Result.css';
import {useState,useEffect} from 'react';
import {Link,useParams} from 'react-router-dom';
import axios from 'axios';
import Footer from '../Home/homes/Footer';
import {Modal,Form,Input,Select, InputNumber} from 'antd';

function Result() {
  const {servicesId} = useParams();
  const [record, setRecord] = useState([]);
  const [eventVisible,setEventVisible] = useState(false);
  const CancelVisible = () =>{setEventVisible(false);}
  const getData = async () => 
  {
    const {data} = await axios.get(`https://eventeasyau.azurewebsites.net/api/services/getallservices`);
    setRecord(data.$values);  
  };
  useEffect(() => {getData(); }, []);
  console.log(record);
    return (
      <div className='result'>
        {/**Navbar */}
        <Header/> 
        {/**Upper Part and Four Columns */}
        <div className='event-intro'>
        {
          record? //is there any venue information ?
          record.map((ele,index)=>{ //yes
            if(ele.servicesId==servicesId){ //only want the last venue service
            return (
              <>
                <div className='intro-img' key={index}>
                  <div>
                    <h2>{ele.serviceName}</h2>
                    <h3>PRICES START AT ${(ele.price/ele.guestAmount*10).toFixed(2)} PP</h3>
                    <button onClick={()=>{setEventVisible(true)}}>Create Event</button>
                    <Modal title="New Event" width={600} visible={eventVisible} onCancel={CancelVisible}className="shop-list">
                      <Form.Item label="Event Name" name="eventName"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                          >
                            <Input />
                      </Form.Item>
                      <Form.Item label="Event Type" name="type"
                            rules={[{ required: true, message: 'Please Select a type!' }]}>
                            <Select>
                              <Select.Option value={0}>Wedding</Select.Option>
                              <Select.Option value={1}>Birthday&Private</Select.Option>
                              <Select.Option value={2}>Corporate Function</Select.Option>
                            </Select>
                      </Form.Item>
                      <Form.Item label="Seat Number" name="seats"
                          rules={[{ required: true, message: 'Please give a seat number!' }]}>
                            <InputNumber/>
                      </Form.Item>
                    </Modal>
                  </div>
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
                <h3>Cocktail: {ele.guestAmount} Banquet: 400 Wedding: 372</h3>
                </div>
                </div>
                <div className='divider'></div>
                <div className='intro-desc'>
                  A grand, sweeping space that rises to every occasion, in the heart of the CBD.
                </div>
              </>
                  )
            }else{ return null}}):''} {/**if not match then don't return */}
        </div>

        {/**All other services */}
        <div className='itemList'> 
           {
                record.map((ele,index)=>{
                 if(ele.serviceType!==0){
                  return  (
                    <div className='item' key={index}>
                      <div className='item-left'
                      style={{backgroundImage:`url("https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=PA1-3CnCcy-HwYCSsVvTOw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=123.645096&pitch=0&thumbfov=100")`}}>
                      </div>
                      <div className='item-right'>
                        <h2><Link to={`/result/details/${ele.servicesId}`}>{ele.serviceName}</Link></h2>
                        <h4>{ele.address}</h4>
                        <div className='merchant'>
                          <h3>{ele.merchant}</h3>
                          <div className='avatar'
                          style={{backgroundImage:`url("https://cpp-prod-seek-company-image-uploads.s3.ap-southeast-2.amazonaws.com/813527/logo/653c2e81-bcca-11ea-86d1-e52bae5cc086.png")`}}></div>
                        </div>
                      </div>    
                      <div className='item-star'>
                      <div className="star" 
                      style={{backgroundImage:`url("https://alacritas.cis.utas.edu.au/~mingked/kit301/PNGs/rating.png")`}}
                      >
                     
                        <h2>{ele.rate}</h2></div>
                      <h4>average price</h4>
                      <h3>{ele.price}</h3>
                      </div>
                      </div> )
                 }else{return null}})
            }
        </div>
        <Footer/>
      </div>
    )
}

export default Result