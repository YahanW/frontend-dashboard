import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Booking(){
 
    return (
      <div className='BookList'>
        <div className='booking'>
            <Link className='book-link' to='/profile/booking/details'>
              <h2>WEDDING PACKAGES: LUXURY STYLE</h2>
              <h3>Finished</h3>
              <h4>April 29, 2022</h4>
              <h4>Ochre Medical Centre Hobart</h4>
            </Link>
        </div>
        <div className='booking'>
            <Link className='book-link' to='/profile/booking/details'>
              <h2>WEDDING PACKAGES: LUXURY STYLE</h2>
              <h3>Finished</h3>
              <h4>April 29, 2022</h4>
              <h4>Ochre Medical Centre Hobart</h4>
            </Link>
        </div>
        <div className='booking'>
            <Link className='book-link' to='/profile/booking/details'>
              <h2>WEDDING PACKAGES: LUXURY STYLE</h2>
              <h3>Finished</h3>
              <h4>April 29, 2022</h4>
              <h4>Ochre Medical Centre Hobart</h4>
            </Link>
        </div>
        <button className='bookBTN'>Load More</button>
    
      </div>

    )
  }


export default Booking
