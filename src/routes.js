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
            </Route>
            <Route path='/login' element={<LoginForm/>}></Route>
        
        </Routes>
    </Router>   
)