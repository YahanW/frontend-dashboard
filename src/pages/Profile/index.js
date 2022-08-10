import React, { Component } from 'react';
import axios from "axios";
import Header from "../../layout/Header";
import { Link,Outlet } from "react-router-dom";
import './profile.css'

export default class Profile extends Component{
  constructor(){
    super();
    this.state ={
      bookSelect:true,
      userInfo:{},
    }
  }

  changeSelectA = () =>{
    this.setBookSelect(true);
  }
  changeSelectB = () =>{
    this.setBookSelect(false);
  }
  

  componentDidMount(){
    //getDerivedStateFromProps(props,state)
  
    //var uid = sessionStorage.getItem('id');
		axios.get(`https://eventeasynew.azurewebsites.net/api/user/get/1`)
		.then(response => {
      this.setState({userInfo:response.data});
		})
		.catch(error=>{
			console.log(error)
		})
    
	}
  render(){
    console.log(this.state.userInfo)
    return (
      <div className='profile'>
        <Header/>
        <div className='upper'>
          <div className='avatar'>
            <div className='ava-pic'></div>
            <button>change profile</button>
          </div>
          <div className='desc'>
            <h1>{this.state.userInfo.userName}</h1>
            <h2>{this.state.userInfo?this.state.userInfo.email:'Nothing here'}</h2>
          </div>
        </div>
        <div className='navies'>
          <div className='nav-sub'
          style={{borderBottom:this.state.bookSelect?'3px solid #33A1C9':''}}
          >
            <Link onClick={this.changeSelectA} to="/profile/booking">Booking History</Link>
          </div>
          <div className='nav-sub'
           style={{borderBottom:this.state.bookSelect?'':'3px solid #33A1C9'}}
           >
            <Link onClick={this.changeSelectB} to="/profile/personal">Personal Details</Link>
          </div>
        </div>
        <Outlet/>
      </div>
    )
 }
}

