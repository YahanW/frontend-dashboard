import React from 'react';
import './home.css'
import Navbar from './homes/Navbar';
import HeroSection from './homes/HeroSection'

function Home () {
    return(
        <div className='Home'>
           <Navbar/>
           <HeroSection />
           
            {/* <User />
           
            <Cards />
            <Footer /> */}
        </div>
    )
}

export default Home;