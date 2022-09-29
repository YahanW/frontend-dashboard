/*
This file displays the service page with subrouting to itemintro

Created by Mingke Deng, and Hans Wang
Last Modified: 25/09/2022
*/

import React from 'react';
import './Result.css';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Home/homes/Footer';
import { Modal, Form, Input, Select, InputNumber, message, DatePicker, Rate } from 'antd';
import Navbar from '../Home/homes/Navbar';
import { FormControl } from '@mui/material';

function Result() {
  const formRef = React.createRef();
  const history = useNavigate();
  const [reviewOrSale, setRS] = useState(true);
  const { servicesId } = useParams();
  const [record, setRecord] = useState([]);
  const [eventVisible, setEventVisible] = useState(false);
  const CancelVisible = () => { setEventVisible(false); }
  //const [events, setEvents] = useState([]);
  const [avail, setAvail] = useState([]);
  const [newService, setNewService] = useState({ eventId: 0, servicesId: servicesId, isReviewed: false });
  const getData = async () => {
    const { data } = await axios.get(`https://eventeasyau.azurewebsites.net/api/services/getallservices`);
    setRecord(data.$values);
    console.log(data);
    axios.get(`https://eventeasyau.azurewebsites.net/api/event/getactiveeventbyuser/${sessionStorage.getItem("id")}`)
      .then(response => {
        console.log(response);
        setAvail(response.data.$values);
      }).catch(err => {
        message.error(err, " Please Login before create an event")
      });


  };
  useEffect(() => { getData(); }, []);

  const onSave = (value) => {
    let dateNow = new Date().toISOString().split("T")[0]
    console.log(value.startTime.toISOString().split("T")[0], dateNow);
    if (value.startTime.toISOString().split("T")[0] > dateNow &&
      value.endTime.toISOString().split("T")[0] > dateNow) {
      if (value.guest > 0) {
        axios.post("https://eventeasyau.azurewebsites.net/api/event/create", value)
          .then(response => {
            console.log(response);
            message.success("Event created successfully");
            CancelVisible();
            history(0);
          }).catch(err => {
            console.log(err)
          })
        getData();
      } else {
        message.error("please enter a valid guest number")
      }
    } else {
      message.error("please select a valid date")
    }
  }
  const changeRS = () => { setRS(!reviewOrSale); }
  const onClick = () => {

    axios.post("https://eventeasyau.azurewebsites.net/api/eventService/create", newService)
      .then(response => {
        console.log(response);
        message.success("Service added successfully");
      }).catch(err => {
        if ((err.response.status) == 409)
          message.error("This service already exists.");
      })
  }

  const layout = {
    //form layout
    labelCol: { span: 10 },
    wrapperCol: { span: 250 }
  }
  console.log(record);
  return (
    <div className='result'>
      {/**Navbar */}
      <Navbar />
      {/**Upper Part and Four Columns */}
      <div className='event-intro'>
        {
          record ? //is there any venue information ?
            record.map((ele, index) => { //yes
              if (ele.servicesId == servicesId) { //only want the last venue service
                return (
                  <>
                    <div className='intro-img' key={index} style={{ backgroundImage: `url(${ele.imagePath})` }}>
                      <h2>{ele.serviceName}</h2>
                      <h3>PRICES START AT ${ele.price} </h3>
                      <div className='actions'>
                        <div className='createNew'>
                          <div>
                            <h3>
                              Create a new event
                            </h3>
                          </div>
                          <div>
                            <button onClick={() => { sessionStorage.getItem('id') ? setEventVisible(true) : history("/login") }}>Create Event</button>
                          </div>
                        </div>
                        <div>
                          <h1>
                            OR
                          </h1>
                        </div>
                        <div className='addToExist'>
                          <FormControl className="right">
                            <Select onSelect={(e) => { setNewService({ eventId: e, servicesId: servicesId }); console.log(newService) }}>
                              {
                                avail ?
                                  avail.map((ele) => {
                                    return (
                                      <Select.Option key={ele.eventId} value={ele.eventId}>
                                        {ele.eventName}
                                      </Select.Option>
                                    )
                                  }) : 'You have no event yet.'
                              }
                            </Select>


                            <button onClick={onClick}>Add to Event</button>

                          </FormControl>
                        </div>
                        <Modal title="New Event" width={600} visible={eventVisible}
                          onCancel={CancelVisible} onOk={() => { formRef.current.submit() }} className="shop-list">
                          <Form onFinish={onSave} ref={formRef} {...layout}
                            fields={[
                              {
                                name: ["customerId"],
                                value: sessionStorage.getItem("id")
                              },
                              {
                                name: ["status"],
                                value: 0
                              },
                              {
                                name: ["staffId"],
                                value: ele.merchantId
                              },
                              {
                                name: ["bookingStatus"],
                                value: 0
                              }
                            ]}


                          >
                            {/* <Form.Item label="User Name" name="customer">
                          <Input disabled={true}/>
                      </Form.Item> */}
                            <Form.Item label="Your UniqueID" name="customerId">
                              <InputNumber disabled={true} />
                            </Form.Item>
                            <Form.Item label="Merchant ID" name="staffId" style={{ display: 'none' }}>
                              <InputNumber disabled={true} />
                            </Form.Item>
                            <Form.Item label="Event Name" name="eventName" rules={[{ required: true, message: 'Please input your username!' }]}>
                              <Input />
                            </Form.Item>
                            <Form.Item label="Event Type" name="eventType"
                              rules={[{ required: true, message: 'Please Select a type!' }]}>
                              <Select>
                                <Select.Option value={0}>Wedding</Select.Option>
                                <Select.Option value={1}>Birthday&Private</Select.Option>
                                <Select.Option value={2}>Corporate Function</Select.Option>
                              </Select>
                            </Form.Item>
                            <Form.Item label="Guest Number" name="guest"
                              rules={[{ required: true, message: 'Please give a seat number!' }]}>
                              <InputNumber />
                            </Form.Item>
                            <Form.Item label="Some Descriptions" name="description">
                              <Input />
                            </Form.Item>
                            <Form.Item label="Booking Status" name="bookingStatus" style={{ display: 'none' }}>
                              <InputNumber />
                            </Form.Item>
                            <Form.Item label="Event Status" name="status" style={{ display: 'none' }}>
                              <InputNumber />
                            </Form.Item>
                            <Form.Item label="Start Time" name="startTime">
                              <DatePicker format={'YYYY/MM/DD'} />
                            </Form.Item>
                            <Form.Item label="End Time" name="endTime" >
                              <DatePicker format={'YYYY/MM/DD'} />
                            </Form.Item>
                          </Form>
                        </Modal>
                      </div>
                    </div>
                    <div className='intro-list'>
                      <div className='list-locate'>
                        <h2>Location</h2>
                        <h3>{ele.serviceLocation} </h3>
                      </div>
                      <div className='list-locate'>
                        <h2>Contact Us</h2>
                        <h3>Bookings & Enquiries +61 3 9114 7360 </h3>
                      </div>
                      <div className='list-locate'>
                        <h2>Services & Facilities</h2>
                        <h3>In-house visual styling and florist, Full AV support, Wi-Fi, Outdoor terrace </h3>
                      </div>
                      <div className='list-locate'>
                        <h2>Capacity</h2>
                        <h3> Seated: {ele.seated} </h3><br /><h3>Standing: {ele.standing}</h3>
                      </div>
                      <div className='list-locate' >
                        <h2>Virtual Reality</h2>
                        <a href="https://showroom.littleworkshop.fr/">
                          <button>3D View</button>
                          </a>
                      </div>
                    </div>
                    <div className='divider'></div>
                    <div className='intro-desc'>
                      A grand, sweeping space that rises to every occasion, in the heart of the CBD.
                    </div>
                  </>
                )
              } else { return null }
            }) : ''} {/**if not match then don't return */}
      </div>
      <div className="detail-review" style={{ display: 'flex', flexDirection: 'row', paddingLeft: '1vw' }}>
        <div className='dr-sub'
          style={{ backgroundColor: reviewOrSale ? '' : 'bisque', width: '5vw' }}
        >
          <Link onClick={changeRS} to={`/result/${servicesId}/intro`}>DETAILS</Link>
        </div>
        <div className='dr-sub'
          style={{ backgroundColor: reviewOrSale ? 'bisque' : '', width: '5vw' }}
        >
          <Link onClick={changeRS} to={`/result/${servicesId}/review`}>REVIEWS</Link>
        </div>
      </div>
      <Outlet />
      {/**All other services */}
      {/* <div className='itemList'>
        {
          record.map((ele, index) => {
            if (ele.serviceType !== 0) {
              return (
                <div className='item' key={index}>
                  <div className='item-left'
                    style={{ backgroundImage: `url("https://easyevent.blob.core.windows.net/image/abcd_f92b9761451328.jpg")` }}>
                  </div>
                  <div className='item-right'>
                    <h2><Link to={`/result/details/${ele.servicesId}`}>{ele.serviceName}</Link></h2>
                    <h4>{ele.address}</h4>
                    <div className='merchant'>
                      <h3>{ele.merchant}</h3>
                      <div className='avatar'
                        style={{ backgroundImage: `url("https://cpp-prod-seek-company-image-uploads.s3.ap-southeast-2.amazonaws.com/813527/logo/653c2e81-bcca-11ea-86d1-e52bae5cc086.png")` }}>

                      </div>
                    </div>
                  </div>
                  <div className='item-star'>
                    <Rate defaultValue={ele.rate} disabled={true} />
                    <h2>{ele.rate || '0'}</h2>
                    <h4>average price</h4>
                    <h3>{ele.price}</h3>
                  </div>
                </div>)
            } else { return null }
          })
        }
      </div> */}
      <Footer />
    </div>
  )
}

export default Result