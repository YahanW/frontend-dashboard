import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from "./pages/Login/LoginForm"

import MainDash from "./pages/Dashboard/Entry"
import welcome from "./assets/imgs/welcome.jpg"
import ServiceDash from "./pages/Service";
import UserDash from "./pages/User";
import Home from "./pages/Home/Home";

import SerMain from "./pages/Home/ServiceMain/serMain";

export default(
    <Router>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route exact path='/services' element={<SerMain/>}></Route>

            
            <Route path='/login' element={<LoginForm/>}></Route>
            <Route path='/dashboard' element={<MainDash/>}>
                <Route index element={<img src={welcome} style={{width:'100%'}}/>}/>
                <Route path='/dashboard/service' element={<ServiceDash/>}/>
                <Route path="/dashboard/member/user" element={<UserDash/>}/>
                <Route path="/dashboard/member/merchant" element={<h1>Merchant List</h1>}/>
                <Route path="/dashboard/booking" element={<h1>Bookings</h1>}/>
            </Route>
            
        
        </Routes>
    </Router>   
)