import React from 'react';
import './home.css'
import Navbar from './homes/Navbar';
import HeroSection from './homes/HeroSection'
import Card from './homes/Cards'
import Footer from './homes/Footer';

function Home () {
    return(
        <div className='Home'>
           <Navbar/>
           <HeroSection />
            <Card />
            <Footer />
        </div>
    )
}

export default Home;