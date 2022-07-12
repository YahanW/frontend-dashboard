import React from 'react';
import './homes/home.css'
import Cards from './homes/Cards';
import Footer from './homes/Footer';
import HeroSection from './homes/HeroSection'
import User from './homes/User';
import Navbar from './homes/Navbar'


function Home () {
    return(
        <div>
            <Navbar/>
            <User />
            <HeroSection />
            <Cards />
            <Footer />
        </div>
    )
}

export default Home;