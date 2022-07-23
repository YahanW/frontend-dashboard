import React from 'react'
import Header from '../../layout/Header'
import './Result.css'
import {useState} from 'react'

function Result() {
  const serType = [ "Venue Renting","Hosting","Decoration","Live Performance","Security","Car Rental",];
  const areType = [ "Hobart","SandyBay","Kinston","NewTown","South Hobart","North Hobart","Dynnyrne"];
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

        <div className='find'> {/**Search bar and Home Logo */}
          <div className='logo'></div>
            <div className='formSearch'>
              <form><input placeholder='Searching by Merchant or Service'/></form>
              <div className='iconSearch'></div>
            </div>
        </div>

        <div className='filter'>  {/**More specific filters*/}
          <div className='selection'> {/**Service type filter*/}
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
          
          <div className='selection'> {/**Area filter*/}
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

          <div className='selection'> {/**Budget filter*/}
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

        <div className='itemList'> {/**Item Results*/}
            <div className='item'>
              {/**Left hand side for representive picture*/}
                <div className='item-left'></div>
              {/**right hand side for some basic item info*/}
                <div className='item-right'>
                  <h2> Flowers for Home </h2>
                  <h4>187 Warwick St, West Hobart TAS 7000</h4>
                  <div className='merchant'>
                    <h3>Botanical Kate Sice</h3>
                    <div className='avatar'></div>
                  </div>
                </div>
              {/**very right side for marking*/}
                <div className='item-star'>
                  <div className="star"><h2>4.5</h2></div>
                  
                  <h4>average price</h4>
                  <h3>$100</h3>
                </div>
            </div>
            
        </div>
      </div>
    )
}

export default Result