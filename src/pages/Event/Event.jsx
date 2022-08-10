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
}
render(){
    return (
        <div>
            <Header/>
            <div className="events">
                <ul className="eve-col">
                    <li className="eve-row">
                    {
                        this.state.eveList ? this.state.eveList.map((ele,index)=>{
                        return <div key={index} className="eve-ele">{
                            <Link className="getService" to='/result'>
                                <h3>{ele.eventName}</h3>
                            </Link>}
                        </div>})
                        :
                        (
                           <>
                                <div className="eve-ele">
                                <Link className="getService" to='/result'>
                                        <h3>Default Events</h3>
                                </Link>
                                </div>
                                <div className="eve-ele">
                                <Link className="getService" to='/result'>
                                        <h3>Default Events</h3>
                                </Link>
                                </div>
                                <div className="eve-ele">
                                <Link className="getService" to='/result'>
                                        <h3>Default Events</h3>
                                </Link>
                                </div>
                                <div className="eve-ele">
                                <Link className="getService" to='/result'>
                                        <h3>Default Events</h3>
                                </Link>
                                </div>
                            </>
                        )
                        
                    } 
                    </li>
                    <li className="eve-row">
                        <div className="eve-ele">
                        <Link className="getService" to='/result'>
                                <h3>Default Events</h3>
                        </Link>
                        </div>
                        <div className="eve-ele">
                        <Link className="getService" to='/result'>
                                <h3>Default Events</h3>
                        </Link>
                        </div>
                        <div className="eve-ele">
                        <Link className="getService" to='/result'>
                                <h3>Default Events</h3>
                        </Link>
                        </div>
                        <div className="eve-ele">
                        <Link className="getService" to='/result'>
                                <h3>Default Events</h3>
                        </Link>
                        </div>
                    </li>
                </ul>
                {/* <button onClick={getEveList}>Test</button> */}
            </div>
            <Footer/>
        </div>
    )
  }
}