import React,{ useState,useEffect} from "react";
import Header from "../../layout/Header";
import Footer from '../Home/homes/Footer';
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import './Event.css';

export default function Event(){
const [eveList,setEveList] = useState([]);
const serType = [ "Venue Renting","Hosting","Decoration","Live Performance","Security","Car Rental",];
const areType = [ "Hobart","SandyBay","Kinston","NewTown","South Hobart","North Hobart","Dynnyrne"];
const bgtType = [ "$50-$99","$100-$499","$500-$999","$1000+"];
const [isActiveRight, setIsActive] = useState(false);
const [isActiveLeft, setLeft] = useState(false);
const [keyWord,setKeyWord] = useState('');
const history = useNavigate();
const goHome = () =>{
    history("/")
}
const handleSelect = () =>{
    setIsActive(!isActiveRight)
  }
const makeSearch = () =>{
    console.log(`searching by ${keyWord}`)
    history("/event")
}
const getEvent = async ()=>{
  const { data } = await 
  axios.get("https://eventeasynew.azurewebsites.net/api/Event/GetAll");
  //setEveList(data.$values);
  return data.$values;
}
useEffect(() => {
  getEvent().then((eveList)=>setEveList(eveList))
}, []);

if(!eveList){ 
  return <li className="eve-row" ><div>Fetching Event Result...</div></li>
}
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
                <div className='left' >
                <p>Type</p>
                <p className='all'>All</p>
                </div>

            <div className='right right-service'>
                <ul>
                {
                    serType.map((ele,index)=>{
                    return <li key={index}
                    style={{backgroundColor:isActiveRight?'darkseagreen':'',color:isActiveRight?'white':'black'}}
                    
                    onClick={handleSelect}>{ele}</li>
                    })
                }
                </ul>
                
            </div>
            
            </div>
            <hr className='hrSearch'/>
            {/**Area filter*/}
            <div className='selection'> 
                <div className='left'>
                <p>Area</p>
                <p className='all'>All</p>
                </div>
                <div className='right right-area'>
                <ul>
                {
                    areType.map((ele,index)=>{
                    return <li key={index} 
                    style={{backgroundColor:isActiveRight?'darkseagreen':'',color:isActiveRight?'white':'black'}}
                    onClick={handleSelect}
                            >{ele}</li>
                    })
                }
                </ul>
            </div>
            </div>
            <hr className='hrSearch'/>
            {/**Budget filter*/}
            <div className='selection'> 
                <div className='left'>
                    <p>Budget</p>
                    <p className='all'>All</p>
                </div>
                <div className='right right-budget'>
                <ul>
                    {
                    bgtType.map((ele,index)=>{
                        return <li key={index}
                        style={{backgroundColor:isActiveRight?'darkseagreen':'',color:isActiveRight?'white':'black'}}
                    onClick={handleSelect}>{ele}</li>
                    })
                    }
                    </ul>
                </div>
            </div>
            <hr className='hrSearch'/>
            </div>
        </div>
            <div className="events">
                <ul className="eve-col">
                {
                    eveList //is there any data remains
                    ? 
                    eveList.map((ele,index)=>{
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