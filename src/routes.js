import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from "./pages/Login/LoginForm"
import Baizhan from "./pages/Entry/Baizhan"
import welcome from "./assets/imgs/welcome.jpg"
import Service from "./pages/Service";
import User from "./pages/User";
export default(
    <Router>
        <Routes>
            <Route path='/' element={<Baizhan/>}>
                <Route index element={<img src={welcome} style={{width:'100%'}}/>}/>
                <Route path='/service' element={<Service/>}/>
                <Route path="/member/user" element={<User/>}/>
                <Route path="/member/merchant" element={<h1>Merchant List</h1>}/>
                <Route path="/booking" element={<h1>Bookings</h1>}/>
            </Route>
            <Route path='/login' element={<LoginForm/>}></Route>
        
        </Routes>
    </Router>   
)