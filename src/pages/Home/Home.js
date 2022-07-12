import React from 'react';
import '../../css/home.css'
import Cards from '../../commons/homes/Cards';
import Footer from '../../commons/homes/Footer';
import HeroSection from '../../commons/homes/HeroSection'
import User from '../../commons/homes/User';
import Navbar from '../../commons/homes/Navbar'


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