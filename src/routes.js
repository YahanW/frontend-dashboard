import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from "./pages/LoginForm"
import Registration from "./pages/Registration"
import Baizhan from "./pages/Baizhan"

export default(
    <Router>
        <Routes>
            <Route path='/' element={<Baizhan/>}/>
            <Route path='/login' element={<LoginForm/>}></Route>
            <Route path='/register' element={<Registration/>}></Route>
        </Routes>
    </Router>   
)