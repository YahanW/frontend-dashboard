import React from "react";
import {BrowserRouter as Router, Routes, Route,Redirect} from 'react-router-dom'

//Dashboard and its sub-routing
import MainDash from "./pages/Dashboard/Entry"
import WelcomeDash from "./pages/Dashboard/welcome.jpg"
import ServiceDash from "./pages/Dashboard/Service";
import UserDash from "./pages/Dashboard/User";
import Event from "./pages/Dashboard/Event";

//login and Register page
import LoginForm from "./pages/Login/LoginForm"
import Register from "./pages/Register/Register";
import ResetPass from "./pages/Login/ResetPass";
//home page and its sub-routing
import Home from "./pages/Home/Home";
import HomeService from "./pages/Home/HomeService";
import Venue from './pages/Venue/Venue';

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
import MakeReview from "./pages/Profile/MakeReview";
import CancelEvent from "./pages/Profile/CancelEvent";

//Shopping Cart and checkout
import CheckOut from "./pages/CheckOut/CheckOut"
import GeoCheck from "./layout/Header/GeoCheck";
//warning 404
import NotFound from "./pages/NotFound";
import Test from "./Test/Test"

export default(
    <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            
            <Route path='/dashboard' element={<MainDash />}>
                <Route index element={<img src={WelcomeDash} style={{height:'90vh'}}/>}/>
                <Route path='/dashboard/service' element={<ServiceDash/>}/>
                <Route path="/dashboard/member/user" element={<UserDash/>}/>
                <Route path='/dashboard/event' element={<Event/>}/>
            </Route>
            <Route path="/test" element={<Test/>}/>

            <Route path='/profile' element={<Profile/>}> 
                <Route index element={<Booking/>}/>
                <Route path='/profile/personal' element={<Personals/>}/>
            </Route>
            
            <Route path='/profile/booking/details' element={<BookHsitory/>}/>
            <Route path='/profile/booking/review' element={<MakeReview/>}/>
            <Route path='/profile/booking/cancel' element={<CancelEvent/>}/>


            <Route path='/geo' element={<GeoCheck/>}/>
            <Route path='/venue/' >
                <Route path='normal/:type/:date/:guest/:budget' element={<Venue/>}/>
                <Route path='name/:type/:area/:budget/:name' element={<Venue/>}/>
                <Route path='advance/:type/:date/:guest/:budget/:area/:stand/:seat' element={<Venue/>}/>
            </Route>

            <Route path='/result/'>
                <Route path=':servicesId'  element={<Result/>}/>
            </Route>

            <Route path='/result/details/:serviceId' element={<ItemIntro/>}>
                <Route  index element={<Intro/>}/>
                <Route path='review' element={<Review/>}/>
            </Route>
       
            <Route path="/checkout/:eventId" element={<CheckOut/>}></Route>
            <Route path='/service' element={<HomeService/>}/>
            <Route path='/sign-user' element={<Register/>}/>
            <Route path='/sign-merchant' element={<Register mode={'m'}/>}/>
           
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='reset' element={<ResetPass/>}/>
           
            <Route path="*"element={<NotFound/>}/>
        </Routes>
    </Router>   
)