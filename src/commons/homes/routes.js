import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Service from '../pages/Service';
import Venus from '../pages/Venus';
import LoginForm from '../pages/LoginForm';
import Home from '../pages/Home'
import Register from '../pages/Register'

export default(
    <Router>
        <Routes>
            <Route path="/" element={<Home/>}></Route> 
            <Route path="/services" element={<Service/>}></Route> 
            <Route path="/login" element={<LoginForm/>}></Route> 
            <Route path="/venues" element={<Venus/>}></Route> 
            <Route path="/sign-up" element={<Register/>}></Route> 
        </Routes>    
    
    </Router>   
)