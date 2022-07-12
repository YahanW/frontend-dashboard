import React from 'react';
import '../../layout/homes/home.css'
import Cards from '../../layout/homes/Cards';
import Footer from '../../layout/homes/Footer';
import HeroSection from '../../layout/homes/HeroSection'
import User from '../../layout/homes/User';
import Navbar from '../../layout/homes/Navbar'


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