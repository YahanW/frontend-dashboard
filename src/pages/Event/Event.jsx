import React,{ useState,useEffect} from "react";
import Header from "../../layout/Header";
import './Event.css';
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import Footer from '../Home/homes/Footer';

export default function Event(){
const [eveList,setEveList] = useState([]);
const getEvent = async ()=>{
    const { data } = await axios.get("https://eventeasynew.azurewebsites.net/api/Event/GetAll");
    setEveList(data.$values);
    
}
const handleSelect = () =>{
    setIsActive(!isActiveRight)
  }
const [isActiveRight, setIsActive] = useState(false);
  const [isActiveLeft, setLeft] = useState(false);
const history = useNavigate();
const goHome = () =>{
    history("/")
  }
const serType = [ "Venue Renting","Hosting","Decoration","Live Performance","Security","Car Rental",];
const areType = [ "Hobart","SandyBay","Kinston","NewTown","South Hobart","North Hobart","Dynnyrne"];
const bgtType = [ "$50-$99","$100-$499","$500-$999","$1000+"];
useEffect(() => {
    getEvent();
  }, []);

    return (
        <div>
            <Header/>
{/* 
///////////////////////////// */}

 {/**Search bar and Home Logo */}
 <div className='find'> 
          <div className='logo' onClick={goHome}></div>
            <div className='formSearch'>
              <form><input placeholder='Searching by Merchant or Service'/></form>
              <div className='iconSearch'></div>
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



{/* 
//////////////////////////////////// */}
            <div className="events">
                <ul className="eve-col">
                {
                    eveList //is there any data remains
                    ? 
                    eveList.map((ele,index)=>{
                        return (    
                            <li className="eve-row" key={index}>
                            
                                    <div className="eve-ele" key={index}>
                                    <Link className="getService" to={`/result/${ele.eventId}`}>
                                            <h3>{ele.eventName}</h3>
                                    </Link>
                                    </div>                 

                                
                            </li>
                                )
                    })
                    :
                    ''
                }       

                {/* { //abandon startegy
                    this.state.eveList.map((ele,index)=>
                    {
                        return <li className="eve-row" key={index}>
                            <div className="eve-ele" key={index}>
                                <Link className="getService" to='/result'>
                                    <h3>{ele.eventName}</h3>
                                </Link>
                            </div>
                        </li>
                    })
                }                                    */}
                </ul>    
            </div>
            <Footer/>
        </div>
    )
  
}