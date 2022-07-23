import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//Dashboard and its sub-routing
import MainDash from "./pages/Dashboard/Entry"
import WelcomeDash from "./pages/Dashboard/welcome.jpg"
import ServiceDash from "./pages/Dashboard/Service";
import UserDash from "./pages/Dashboard/User";
//login and Register page
import LoginForm from "./pages/Login/LoginForm"
import Register from "./pages/Register/Register";

//home page and its sub-routing
import Home from "./pages/Home/Home";
import HomeService from "./pages/Home/HomeService";
import HomeVenues from "./pages/Home/HomeVenues";

//searching result related
import Result from "./pages/Result/Result";

//profile related
import Profile from "./pages/Profile";

export default(
    <Router>
        <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route path='/search' element={<Result/>}></Route>
            <Route path='/service' element={<HomeService/>}></Route>
            <Route path='/venue' element={<HomeVenues/>}></Route>
            <Route path='/sign-up' element={<Register/>}></Route>
            <Route path='/login' element={<LoginForm/>}></Route>
            <Route path='/dashboard' element={<MainDash />}>
                <Route index element={<img src={WelcomeDash} style={{width:'100%'}}/>}/>
                <Route path='/dashboard/service' element={<ServiceDash/>}/>
                <Route path="/dashboard/member/user" element={<UserDash/>}/>
                <Route path="/dashboard/member/merchant" element={<h1>Merchant List</h1>}/>
                <Route path="/dashboard/booking" element={<h1>Bookings</h1>}/>
            </Route>
            <Route path='/profile' element={<Profile/>}></Route>
           
        
        </Routes>
    </Router>   
)