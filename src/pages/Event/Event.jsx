import React,{ Component} from "react";
import Header from "../../layout/Header";
import './Event.css';
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from '../Home/homes/Footer';

export default class Event extends Component{
constructor(){
    super();
    this.state = {
        eveList:[]
    }
}

componentDidMount (){
    axios.get("https://eventeasynew.azurewebsites.net/api/Event/GetAll")
	.then(response => {
        this.setState({
            eveList:response.data
        })
    })
    // console.log("component did mounted")
    // console.log(this.state.eveList)
}
render(){
    var i = 0;
    var finished = false;
    return (
        <div>
            <Header/>
            <div className="events">
                <ul className="eve-col">
                {
                    this.state.eveList //is there any data remains
                    ? 
                    this.state.eveList.map((ele,index)=>{
                        return (    
                            <li className="eve-row" key={index}>
                                {   
                                    <div className="eve-ele" key={index}>
                                    <Link className="getService" to='/result'>
                                            <h3>{ele.eventName}</h3>
                                    </Link>
                                    </div>                 

                                }
                            </li>
                                )
                    })
                    :
                    ''
                }       

                {/* { //abandon startegy
                    this.state.eveList.map((ele,index)=>
                    {
                        return <li className="eve-row" key={index}>
                            <div className="eve-ele" key={index}>
                                <Link className="getService" to='/result'>
                                    <h3>{ele.eventName}</h3>
                                </Link>
                            </div>
                        </li>
                    })
                }                                    */}
                </ul>    
            </div>
            <Footer/>
        </div>
    )
  }
}