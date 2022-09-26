/*
This file shows the footer, links and functions are 
displaying only.

Created by Mingke Deng, and Hans Wang
Last Modified: 23/09/2022
*/
import React from 'react'
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return (
        
        <div className='footer-container'>
            
                <div className='left'>
                <section className='footer-subscription'>
                    <p className='footer-subscription-heading'>
                        Sign Up For Our Newsletter
                    </p>
                    
                    <div className='input-areas'>
                        <form>
                            <input
                                className='footer-input'
                                name='email'
                                type='email'
                                placeholder='Your Email'
                            />
                            <Button type='primary'>Subscribe</Button>
                        </form>
                    </div>
                    <p className='footer-subscription-text'>
                        Join the conversation  Sign up to receive emails for events,
                        specials, tips and general info
                    </p>
                </section>
                <section class='copyright'>
                    <Link to='/' className='homeLink'>
                        EventEasy
                    </Link>
                    <small class='website-rights'>EventEasy © 2022</small>
                </section>
                </div>
                <div className='right'>
                    <div class='footer-links'>
                        <div className='footer-link-wrapper'>
                            <div class='footer-link-items'>
                                <h2>About Us</h2>
                                <Link to='/sign-user'>How it works</Link>
                                <Link to='/'>Testimonials</Link>
                                <Link to='/'>Careers</Link>
                                <Link to='/'>Investors</Link>
                                <Link to='/'>Terms of Service</Link>
                            </div>
                            <div class='footer-link-items'>
                                <h2>Success Instances</h2>
                                <Link to='/'>Fantasy Studio</Link>
                                <Link to='/'>Masterplan Agency</Link>
                                <Link to='/'>A Wedding to Remember</Link>
                                <Link to='/'>Eventima</Link>
                                <Link to='/'>The Event Fairy</Link>
                                <Link to='/'>Magic Time</Link>
                            </div>
                        </div>
                        <div className='footer-link-wrapper'>
                            <div class='footer-link-items'>
                                <h2>Contact Us</h2>
                                <Link to='/'>Investigation</Link>
                                <Link to='/'>Phone</Link>
                                <Link to='/'>Partnerships</Link>
                            </div>
                        </div>
                    </div>
            </div>
         
        </div>
        
    );
}

export default Footer;