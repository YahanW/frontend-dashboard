import React, { Component } from 'react';
import Header from '../../layout/Header';
import { Link } from 'react-router-dom';
import './NotFound.css';
import Navbar from '../Home/homes/Navbar';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div className='lost-content'>
          <h2>Lost Your Way ?</h2>
          <h4>Sorry, we can't find that page. You'll find loads to explore on the home page</h4>
          <button><Link to="/">EventEasy Home</Link></button>
          <div className='code'>
            <h3 className='c1'>Error Code</h3>
            <h3 className='c2'>HTTP 404</h3>
          </div>
        </div>
      </div>
    )
  }
}