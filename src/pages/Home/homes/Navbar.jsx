import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

import './Navbar.css';
import { useNavigate } from "react-router-dom";

function Navbar(){
const history = useNavigate();
const [click, setClick] = useState(false);
const [button, setButton] = useState(true);
const [selectShow, setSelectShow] = useState(true);
const handleClick = () => setClick(!click);
const closeMobileMenu = () => setClick(false);
const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
useEffect(() => {
        showButton();
    }, []);
window.addEventListener('resize', showButton);
const logUserOut = () =>{
    sessionStorage.clear();
    history("/")
}
const setSelection = () =>{
    setSelectShow(!selectShow);
    return
}    


return ( 

    <div className='navbar'>
        <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                <img src='https://alacritas.cis.utas.edu.au/~mingked/kit301/PNGs/logo.png'/>
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Home
                    </Link>
                </li>
               {
                sessionStorage.getItem('token') 
                ?
                <li className='nav-item'>
                <Link
                    to='/profile'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Profile
                </Link>
                </li>
                :
                <li className='nav-item'>
                <Link
                    to='/service'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Services
                </Link>
                </li>
               }
               
                { 
                    sessionStorage.getItem('token') 
                    ?
                    <li>
                      <Link
                            to='/'
                            className='nav-links'
                            onClick={logUserOut}
                        >
                        Logout
                        </Link>  
                    </li>
                    :
                    <li>
                      <Link
                            to='/login'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                        Login
                        </Link>  
                    </li>
                }

                {
                    sessionStorage.getItem('token')
                    ?
                    <li className='nav-item'>
                    <Link
                        to='/dashboard'
                        className='nav-links'
                        onClick={closeMobileMenu}
                    >
                        Dashboard
                    </Link>
                    </li>
                    :
                    <li className='nav-item'>
                        <p className='nav-links' onClick={setSelection}
                        style={{display:selectShow?'':'none'}}>
                            Sign Up
                        </p>
                        <div className="register" style={{display:selectShow?'':''}}>
                                
                                <Link to='/sign-user' 
                                className=' reg-it' onClick={closeMobileMenu}
                                style={{display:selectShow?'none':''}}
                                >
                                    Sign User
                                </Link>
                                
                               
                                <Link to='/sign-merchant' 
                                className=' reg-it' 
                                onClick={closeMobileMenu}
                                style={{display:selectShow?'none':''}}
                                >
                                    Sign Merchant
                                </Link>
                                
                        </div>
                       
                    </li>

                }
                
             </ul>
                 {/* button && <Button buttonStyle='btn--outline'>SIGN UP</Button> */}
        </div>
    </div>
    )
}

export default Navbar