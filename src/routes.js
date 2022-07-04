import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from "./pages/LoginForm"
import Baizhan from "./pages/Baizhan"
import welcome from "./assets/imgs/welcome.jpg"

export default(
    <Router>
        <Routes>
            <Route path='/' element={<Baizhan/>}>
                <Route index element={<img src={welcome} style={{width:'100%'}}/>}/>
                <Route path='/service/corporate' element={<h1>Corporate Function</h1>}/>
                <Route path="/user/member" element={<h1>User List</h1>}/>
                <Route path="/merchant/member" element={<h1>Merchant List</h1>}/>
                <Route path="/booking" element={<h1>Bookings</h1>}/>
            </Route>
            <Route path='/login' element={<LoginForm/>}></Route>
        
        </Routes>
    </Router>   
)