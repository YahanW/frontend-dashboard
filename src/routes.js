import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from "./pages/Main";
import LoginForm from "./pages/LoginForm"
import Registration from "./pages/Registration"

export default(
    <Router>
        <Routes>
            <Route path='/' element={<Main/>}>
                <Route index element={<h1>default page</h1>}/>  
            </Route>
            <Route path='/login' element={<LoginForm/>}></Route>
            <Route path='/register' element={<Registration/>}></Route>
        </Routes>
    </Router>   
)