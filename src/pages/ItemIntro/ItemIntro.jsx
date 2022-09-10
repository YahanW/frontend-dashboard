import React , {useState,useEffect} from "react";
import FormControl from '@mui/material/FormControl';
import Header from "../../layout/Header";
import {Button, Select, message} from 'antd';
import {Link, Outlet,useParams, useNavigate} from 'react-router-dom';
import './ItemIntro.css'
import axios from "axios";
import FormItem from "antd/lib/form/FormItem";
import Navbar from "../Home/homes/Navbar";
function ItemIntro(){
    //const docRef = React.createRef();
    const [reviewOrSale,setRS] = useState(false);
    const [imgIndex,setImgIndex] = useState(0);
    const [details,setDetails] = useState([]);
    const {serviceId} = useParams();
    const [avail,setAvail] = useState([]);
    const [eventVisible, setEventVisible] = useState(false);
    const formRef = React.createRef();
    const history = useNavigate();
    const [eventId,setEventId] = useState(0); 
    const [newService, setNewService] = useState({eventId:0,servicesId:parseInt(serviceId)});
    const getDetail = async ()=>{
      const {data} = await axios.get(`https://eventeasyau.azurewebsites.net/api/services/getservices/${serviceId}`)
      setDetails(data);
      
    }
    const getEvents = ()=>{
        axios.get(`https://eventeasyau.azurewebsites.net/api/event/geteventbyuser/${sessionStorage.getItem("id")}`)
        .then(response=>{
            setAvail(response.data.$values)
          
        }).catch(err=>{console.log(err)})
      }
    useEffect(()=>{
      getDetail();
      getEvents();

    },[])
    const changeRS = () =>{ setRS(!reviewOrSale);}
    const imgDemo = [{
        source:'https://www.christies.com/media-library/images/features/articles/2019/04/02/andrew-graham-dixon-on-the-night-watch-by-rembrandt/rembrandtharmenszvanrijnmilitiacompanyofdistrictiiunderthecommandofcaptainfransbanninckcocqknownasthenightwatch16422400.jpg?w=780'
    },{
        source:'https://i1.lsqww.com/0b461f2c14cdba53c84c/551f5e74/561f5d75/09455d7049c6e649c812b2.png'
    },{
        source:'https://artnewsnet.com/wp-content/uploads/2018/10/3-15.jpg'
    }];
    
    const incre = (n) => {
        setImgIndex(n)
    }

    const onClick = () => {

        axios.post("https://eventeasyau.azurewebsites.net/api/eventService/create", newService)
            .then(response => {
                console.log(response);
                message.success("Service added successfully");
            }).catch(err => {
                if ((err.response.status)==409)
                    message.error("This service already exists.");
            })  
    }

    return (
        <div>
            <Navbar/>
            <div className="selecBox">
                <div className="selection">
                    <h1>{details.serviceName}</h1>
                    <div className="selc-shop" >
                        <div className="imagesub">
                        {
                            imgDemo.map((ele,index)=>{
                                return <div className="imgsub" onClick={()=>incre(index)}
                                key={index} style={{backgroundImage:`url(${ele.source})`}}></div>
                            })
                        }
                        </div>
                        <div className="imageShow" name="imageShow" 
                        style={{backgroundImage:`url(${imgDemo[imgIndex].source})`}}></div>
                      
                        <FormControl className="right">
                            <p>
                                Choose one of your available events to add services
                            </p>
                            <Select onSelect={(e) => {setNewService({eventId:e,servicesId:parseInt(serviceId)}); console.log(newService) }}>
                                    {
                                        avail?
                                        avail.map((ele)=>{
                                            return(
                                                <Select.Option key={ele.eventId} value={ele.eventId}>
                                                    {ele.eventName} 
                                                </Select.Option>
                                            )
                                        }):'You have no event yet.'
                                    }
                                </Select>


                            <button onClick={onClick}>Add to Event</button>
                            
                        </FormControl>
                       
                    </div>
                </div>
            </div>
            <div className="detail-review">
                <div className='dr-sub'
                style={{backgroundColor:reviewOrSale?'':'bisque',}}
                >
                    <Link onClick={changeRS} to={`/result/details/${serviceId}`}>DETAILS</Link>
                </div>
                <div className='dr-sub'
                style={{ backgroundColor:reviewOrSale?'bisque':'',}}
                >
                    <Link onClick={changeRS} to={`/result/details/${serviceId}/review`}>REVIEWS</Link>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default ItemIntro;