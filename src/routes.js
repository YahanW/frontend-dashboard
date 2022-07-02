import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from "./pages/LoginForm"

import Baizhan from "./pages/Baizhan"

export default(
    <Router>
        <Routes>
            <Route path='/' element={<Baizhan/>}/>
            <Route path='/login' element={<LoginForm/>}></Route>
        </Routes>
    </Router>   
)