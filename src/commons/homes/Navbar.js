import React, { useState, useEffect,Component } from 'react';
import {Link} from 'react-router-dom'
import { Button } from './Button';
import axios from 'axios'
import './Navbar.css';

function Navbar(){

const [click, setClick] = useState(false);
const [button, setButton] = useState(true);
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

    return ( 

    <div>
        <nav className='navbar'>
        <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                <img src='./img/logo.png'/>
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
                <li className='nav-item'>
                    <Link
                        to='/dashboard'
                        className='nav-links'
                        onClick={closeMobileMenu}
                    >
                        Dashboard
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        to='/services'
                        className='nav-links'
                        onClick={closeMobileMenu}
                    >
                        Services
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        to='/login'
                        className='nav-links'
                        onClick={closeMobileMenu}
                    >
                        Login
                    </Link>
                </li>

                <li>
                    <Link
                        to='/sign-up'
                        className='nav-links-mobile'
                        onClick={closeMobileMenu}
                    >
                        Sign Up
                    </Link>
                </li>
             </ul>
                { button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
             </div>
        </nav>
        
    </div>
    )
}

export default Navbar