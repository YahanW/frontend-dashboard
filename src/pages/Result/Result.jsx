import React from 'react'
import Header from '../../layout/Header'
import './Result.css'
import {useState} from 'react'

function Result() {
  const serType = [ "Venues","Hosts","Decoration","Performance","Security","Rental","Venues","Hosts","Decoration","Performance","Security",];
  const areType = [ "Hobart","SandyBay","Kinston","NewTown","South Hobart"];
  const bgtType = [ "$50-$99","$100-$499","$500-$999","$1000+"];
  const [isActiveRight, setIsActive] = useState(false);
  const [isActiveLeft, setLeft] = useState(false);
  var areaID = 1;
  const handleSelect = () =>{
    setIsActive(!isActiveRight)
  }
    return (
      <div className='result'>
        <Header/> {/**Navbar */}
        <div className='find'>
          <div className='logo'></div>
            <div className='formSearch'>
              <form><input placeholder='Searching by Merchant or Service'/></form>
              <div className='iconSearch'></div>
            </div>
        </div>

        <div className='filter'> 

          <div className='selection'>
            <div className='left'>
              <p>Service Type</p>
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
          <div className='itemList'>
            <div className='item'></div>
          </div>
        </div>
      </div>
    )
}

export default Result