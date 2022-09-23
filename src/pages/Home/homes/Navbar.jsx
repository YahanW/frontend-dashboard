import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import ShoppingCart from '../../../layout/Header/ShoppingCart';
import './Navbar.css';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const history = useNavigate();
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [selectShow, setSelectShow] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const uid = sessionStorage.getItem('id');
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
    const logUserOut = () => {
        sessionStorage.clear();
        history("/")
    }
    const setSelection = () => {
        setSelectShow(!selectShow);
        return
    }

    return (

        <div className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    <img src='https://easyevent.blob.core.windows.net/image/logo_1dc871378bfda.png' />
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
                        sessionStorage.getItem('id')
                            ?
                            <>
                                <li className='nav-item'>
                                    <Link
                                        to='/profile'
                                        className='nav-links'
                                        onClick={closeMobileMenu}
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li className='nav-item' >
                                    <ShoppingCart />
                                </li>
                            </>
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
                        sessionStorage.getItem('id')
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
                        sessionStorage.getItem('id')
                            ?
                            //check if logged in
                            (sessionStorage.getItem('access') < 5
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
                                    <Link
                                        to='/service'
                                        className='nav-links'
                                        onClick={closeMobileMenu}
                                    >
                                        Service
                                    </Link>
                                </li>

                            )

                            :
                            <li className='nav-item' onMouseEnter={setSelection} onMouseLeave={setSelection}>
                                <a className='nav-links' 
                                    style={{ display: selectShow ? '' : 'none'}}>
                                    Sign Up
                                </a>
                                <div className="register" style={{ height: selectShow ? '0vh' : 'fit-content' }} 
                                >

                                    <Link to='/sign-user'
                                        className=' reg-it' onClick={closeMobileMenu}
                                        style={{ display: selectShow ? 'none' : '' }}
                                    >
                                        As a User
                                    </Link>


                                    <Link to='/sign-merchant'
                                        className=' reg-it'
                                        onClick={closeMobileMenu}
                                        style={{ display: selectShow ? 'none' : '' }}
                                    >
                                        As a Merchant
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