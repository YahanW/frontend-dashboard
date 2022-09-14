import React,{ useState,useEffect} from "react";
import Header from "../../layout/Header";
import Footer from '../Home/homes/Footer';
import { Radio } from 'antd';
import { Link,useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import './Venue.css';
import Navbar from "../Home/homes/Navbar";

export default function Event(){
const [eveListTemp,setEveListTemp] = useState([]);
const serType = [ "All","Venue","Food","Decoration","Live Performance","Security","Car Rental",];
const areType = [ "All","Hobart","SandyBay","Kinston","NewTown","South Hobart","North Hobart","Dynnyrne"];
const bgtType = [ "All","$500","$1000","$1500","$2000+"];
const [curType,setCurType] = useState("All");
const [curAre,setCurAre] = useState("All");
const [curBgt,setCurBgt] = useState(0);
const {type,date,guest,budget,area,stand,seat} = useParams();
const [keyWord,setKeyWord] = useState('');
const history = useNavigate();
const [eventCount,setEventCount] = useState(0);
const goHome = () =>{
    history("/")
}
const makeSearch = () =>{
    history(`/event/${curType}/${curAre}/${curBgt}/${keyWord}`)
}
const getEvent = async ()=>{
  const { data } = await 
  axios.get("https://eventeasyau.azurewebsites.net/api/services/getservicesbytype/0");
  //setEveList(data.$values);
  return data.$values;
}

useEffect(() => {
  getEvent().then((eveListTemp)=>setEveListTemp(eveListTemp))
    console.log(type,date,guest,budget,area,stand,seat)
}, []);

if(!eveListTemp){ 
  return <li className="eve-row" ><div>Fetching Event Result...</div></li>
}

  //console.log(type,date,guest,budget);
  console.log(eveListTemp)
    return (
        <div>
            <Navbar/>
            <div className="eventSearch">
            {/**Search bar and Home Logo */}
                {/* <div className='find'> 
                    <div className='logo' onClick={goHome}></div>
                    <div className='formSearch'>
                        <form>
                            <input placeholder='Searching by Merchant or Service'
                                 onChange={e=>setKeyWord(e.target.value)}
                            />
                        </form>
                    <div className='iconSearch' onClick={makeSearch}></div>
                </div> */}
            {/* </div> */}

            {/**More specific filters*/}

            <div className='filter'>  
            {/**Service type filter*/}
            <div className='selection'>  
            <p>Type</p>
            <div className='right right-service'>
               
                <Radio.Group value={curType}>
                {
                    serType.map((ele,index)=>{
                    return <Radio value={ele} key={index}
                    onChange={()=>{setCurType(ele)}}
                    
                    >{ele}</Radio>
                    })
                }
                </Radio.Group>
            </div>
            
            </div>
            <hr className='hrSearch'/>
            {/**Area filter*/}
            <div className='selection'> 
                <p>Area</p>
                <div className='right right-area'>
                <Radio.Group value={curAre}>
                {
                    areType.map((ele,index)=>{
                    return <Radio value={ele} key={index}
                    onChange={()=>{setCurAre(ele)}}
                    >{ele}</Radio>
                    })
                }
                </Radio.Group>
            </div>
            </div>
            <hr className='hrSearch'/>
            {/**Budget filter*/}
            <div className='selection'> 
                <p>Budget</p>
                <div className='right right-budget'>
                <Radio.Group value={curBgt}>
                {
                    bgtType.map((ele,index)=>{
                    return <Radio value={bgtType.indexOf(ele)*500} key={index}
                    onChange={()=>{setCurBgt(bgtType.indexOf(ele)*500)}}
                    >{ele}</Radio>
                    })
                }
                </Radio.Group>
                </div>
            </div>
            <hr className='hrSearch'/>

            </div>
            </div>
            <div className="events">
                <ul className="eve-col">
                {
                    eveListTemp //is there any data remains
                    ? 
                    eveListTemp.map((ele,index)=>{
                       if(ele.price<=budget&&ele.guestAmount>=guest){
                       
                            return (    
                                <li className="eve-row" key={index} id="e-valid">
                                        <div className="eve-ele" 
                                        key={index}>
                                        <Link className="getService" to={`/result/${ele.servicesId}`}>
                                                <h3 style={{color:'white',fontSize:'2.7rem',fontFamily:`"Times New Roman", "Times", "serif"`,}}>
                                                    {ele.serviceName}
                                                </h3>
                                                <h4 style={{color:'white',fontSize:'1rem',
                                                fontFamily:`"Times New Roman", "Times", "serif"`,}}>
                                                    {'Learn More'}
                                                    
                                                </h4>
                                        </Link>
                                        </div>            
                                </li>
                        )
                       }
                    })
                    :
                    <li className="eve-row">
                    {'No Relavent Result ...'}
                    </li>
                }       
                </ul>    
            </div>
            <Footer/>
        </div>
    )
  
}