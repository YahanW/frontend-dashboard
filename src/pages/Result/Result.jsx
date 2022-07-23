import React from 'react'
import Header from '../../layout/Header'
import './Result.css'

function Result() {
  
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
            <p>Service Type</p>
          </div>
          <div className='selection'>
            <p>Area</p>
          </div>
          <div className='selection'>
            <p>Budget</p>
          </div>
        </div>
        <div className='itemList'>
          <div className='item'></div>
        </div>
      </div>
    )
}

export default Result