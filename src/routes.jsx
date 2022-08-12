import React from "react";
import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom'

//Dashboard and its sub-routing
import MainDash from "./pages/Dashboard/Entry"
import WelcomeDash from "./pages/Dashboard/welcome.jpg"
import ServiceDash from "./pages/Dashboard/Service";
import UserDash from "./pages/Dashboard/User";
//login and Register page
import LoginForm from "./pages/Login/LoginForm"
import Register from "./pages/Register/Register";
import ResetPass from "./pages/Login/ResetPass";
//home page and its sub-routing
import Home from "./pages/Home/Home";
import HomeService from "./pages/Home/HomeService";
import Event from "./pages/Event/Event";

//Service result related
import Result from "./pages/Result/Result";
import ItemIntro from "./pages/ItemIntro/ItemIntro";
import Intro from "./pages/ItemIntro/Intro";
import Review from "./pages/ItemIntro/Review";

//profile related
import Profile from "./pages/Profile";
import Personals from "./pages/Profile/Personals";
import Booking from "./pages/Profile/Booking";
import BookHsitory from "./pages/Profile/BookHistory";
//trolley and checkout
import CheckOut from "./pages/CheckOut/CheckOut"

//warning 404
import NotFound from "./pages/NotFound";

export default(
    <Router>
        <Routes>
            <Route index exact path='/' element={<Home/>}/>
            <Route path='/dashboard' element={<MainDash />}>
                <Route index element={<img src={WelcomeDash} style={{width:'100%'}}/>}/>
                <Route path='/dashboard/service' element={<ServiceDash/>}/>
                <Route path="/dashboard/member/user" element={<UserDash/>}/>
                <Route path="/dashboard/member/merchant" element={<h1>Merchant List</h1>}/>
                <Route path="/dashboard/booking" element={<h1>Bookings</h1>}/>
            </Route>
            <Route path='/profile' element={<Profile/>}> 
                <Route index element={<Booking/>}/>
                <Route path='/profile/booking' element={<Booking/>} />
                <Route path='/profile/personal' element={<Personals/>}/>
            </Route>
            <Route path='/event' element={<Event/>}/>
            <Route path='/profile/booking/details' element={<BookHsitory/>}/>
            <Route path='/result/:eventId' element={<Result/>}/>


            <Route path='/result/details' element={<ItemIntro/>}>
                <Route index element={<Intro/>}/>
                <Route path='/result/details/intro'  element={<Intro/>}/>
                <Route path='/result/details/review' element={<Review/>}/>
            </Route>
           

            <Route path="/checkout" element={<CheckOut/>}></Route>
            <Route path='/service' element={<HomeService/>}/>
            <Route path='/sign-user' element={<Register/>}/>
            <Route path='/sign-merchant' element={<Register mode={'m'}/>}/>
           
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='reset' element={<ResetPass/>}/>
           
            <Route path="*"element={<NotFound/>}/>
        </Routes>
    </Router>   
)