import React from "react";
import {BrowserRouter as Router, Routes, Route,Redirect} from 'react-router-dom'

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
            <Route path='/' element={<Home/>}/>
            
            <Route path='/dashboard' element={<MainDash />}>
                <Route index element={<img src={WelcomeDash} style={{width:'100%'}}/>}/>
                <Route path='/dashboard/service' element={<ServiceDash/>}/>
                <Route path="/dashboard/member/user" element={<UserDash/>}/>
                <Route path="/dashboard/member/merchant" element={<h1>Merchant List</h1>}/>
                <Route path="/dashboard/booking" element={<h1>Bookings</h1>}/>
            </Route>

            <Route path='/profile/' element={<Profile/>}> 
                <Route path='booking' index element={<Booking/>} />
                <Route path='personal' element={<Personals/>}/>
            </Route>

            <Route path='/event/' >
                <Route path=':type/:date/:guest/:budget' element={<Event/>}/>
                <Route path=':type/:seat/:budget' element={<Event/>}/>
            </Route>

            <Route path='/profile/booking/details' element={<BookHsitory/>}/>

            <Route path='/result/'>
                <Route path=':eventId'  element={<Result/>}/>
            </Route>

        
            <Route path='/result/details/:serviceId' element={<ItemIntro/>}>
                <Route path='intro'  index element={<Intro/>}/>
                <Route path='review' element={<Review/>}/>
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