import React,{ useState,useEffect} from "react";
import Header from "../../layout/Header";
import Footer from '../Home/homes/Footer';
import { Radio } from 'antd';
import { Link,useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import './Event.css';

export default function Event(){
const [eveListTemp,setEveListTemp] = useState([]);
const serType = [ "All","Venue Renting","Hosting","Decoration","Live Performance","Security","Car Rental",];
const areType = [ "All","Hobart","SandyBay","Kinston","NewTown","South Hobart","North Hobart","Dynnyrne"];
const bgtType = [ "All","$50-$99","$100-$499","$500-$999","$1000+"];
const [curType,setCurType] = useState("");
const [curAre,setCurAre] = useState("");
const [curBgt,setCurBgt] = useState("");
const {type,date,guest,budget} = useParams();
const [keyWord,setKeyWord] = useState('');
const history = useNavigate();

const goHome = () =>{
    history("/")
}
const makeSearch = () =>{
    //console.log(`searching by ${keyWord}`)
    history(`/event/${curType}/${curAre}/${curBgt}/${keyWord}`)
    //console.log(curType,curAre,curBgt,keyWord)
}
const getEvent = async ()=>{
  const { data } = await 
  axios.get("https://eventeasynew.azurewebsites.net/api/Event/GetAll");
  //setEveList(data.$values);
  return data.$values;
}

useEffect(() => {
  getEvent().then((eveListTemp)=>setEveListTemp(eveListTemp))
  
}, []);

if(!eveListTemp){ 
  return <li className="eve-row" ><div>Fetching Event Result...</div></li>
}

  console.log(type,date,guest,budget);
    return (
        <div>
            <Header/>
            <div className="eventSearch">
            {/**Search bar and Home Logo */}
            <div className='find'> 
            <div className='logo' onClick={goHome}></div>
                <div className='formSearch'>
                    <form>
                        <input placeholder='Searching by Merchant or Service'
                        onChange={e=>setKeyWord(e.target.value)}
                        />
                    </form>
                    <div className='iconSearch' onClick={makeSearch}></div>
                </div>
            </div>

            {/**More specific filters*/}

            <div className='filter'>  
            {/**Service type filter*/}
            <div className='selection'> 
            <p>Type</p>
            <div className='right right-service'>
               
                <Radio.Group>
                {
                    serType.map((ele,index)=>{
                    return <Radio value={index}
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
                <Radio.Group>
                
                {
                   
                    areType.map((ele,index)=>{
                    return <Radio value={index}
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
                <Radio.Group>
                {
                    bgtType.map((ele,index)=>{
                    return <Radio value={index}
                    onChange={()=>{setCurBgt(ele)}}
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
                       if(ele.budget<=budget){
                        return (    
                            <li className="eve-row" key={index}>
                            
                                    <div className="eve-ele" 
                                    
                                    key={index}>
                                      <Link className="getService" to={`/result/${ele.eventId}`}>
                                              <h3 style={{color:'white',fontSize:'2.7rem',fontFamily:`"Times New Roman", "Times", "serif"`,}}>
                                                {ele.eventName}
                                              </h3>
                                              <h4 style={{color:'white',fontSize:'1rem',
                                              fontFamily:`"Times New Roman", "Times", "serif"`,}}>
                                                Learn More 
                                              </h4>
                                      </Link>
                                    </div>                 

                                
                            </li>
                                )
                       }
                    })
                    :
                    'No Relavent Result ...'
                }       
                </ul>    
            </div>
            <Footer/>
        </div>
    )
  
}