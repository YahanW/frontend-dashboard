/*
This file shows the search result list. Although named venue.jsx 

Created by Mingke Deng, and Hans Wang
Last Modified: 23/09/2022
*/
import React, { useState, useEffect } from "react";
import Footer from '../Home/homes/Footer';
import { Radio } from 'antd';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './Venue.css';
import Navbar from "../Home/homes/Navbar";
import { stringify } from "rc-field-form/es/useWatch";
import { usePromiseTracker } from 'react-promise-tracker';
import { Puff } from 'react-loader-spinner';
import { trackPromise } from 'react-promise-tracker';

export default function Event() {
    const [venueList, setVenueList] = useState([]);
    const [resultList, setResultList] = useState([]);
    const serType = ["Venue", "Food", "Beverage", "Entertainment", "Florist", "Photographer", "ALL"];
    const areType = ["All", "Hobart", "SandyBay", "Kingston", "NewTown", "South Hobart", "North Hobart", "Dynnyrne"];
    const bgtType = ["All", "$1,000", "$2,000", "$5,000", "$10,000", "10,000+"];
    const [curType, setCurType] = useState("ALL");
    const [curAre, setCurAre] = useState("All");
    const [curBgt, setCurBgt] = useState("All");
    const { type, date, guest, budget, area, stand, seat } = useParams();
   
    // get all services
    const getAll =() => {
        trackPromise(
            axios.get("https://eventeasyau.azurewebsites.net/api/services/getEnableservices")
            .then(res=>{
                 setVenueList(res.data.$values); //store all venues
                 console.log(venueList)
                 setResultList(res.data.$values)
               
            })
            
        )    // retrieve all active services

        // setVenueList(data.$values); //store all venues
        // console.log(venueList)
        // setResultList(data.$values)
        //venues = venueList;
    };
    const LoadingIndicator = () => {
        const { promiseInProgress } = usePromiseTracker();
        return (
            promiseInProgress && <div
                style={{ marginLeft: "14vw" }}>
                <Puff color="#00BFFF" height={80} width={800} />
            </div>
        );
    }

    const filterResult = (type, change) => {
        console.log(type, change)
        var venues = venueList.slice();
        var ind = 0;
        console.log("venues", venues);
        if (type === 0) {  // change type is service
            switch (change) {
                case serType[0]:
                    ind = 0;
                    break;
                case serType[1]:
                    ind = 1;
                    break;
                case serType[2]:
                    ind = 2;
                    break;
                case serType[3]:
                    ind = 3;
                    break;
                case serType[4]:
                    ind = 4;
                    break;
                case serType[5]:
                    ind = 5;
                    break;
                case serType[6]:
                    ind = 6;
                    break;
                default: ind = 0;
                    break;
            }
            console.log(curType, curAre, curBgt);
            venues = changeType(venues, ind);
            venues = (changeArea(venues, curAre));
            venues = (changeBudget(venues, curBgt));
        }
        if (type === 1) {   // change type is area/suburbs
            //setCurAre(change);
            console.log("suburb", curAre);
            venues = changeType(venues, ind);
            venues = (changeArea(venues, change));
            venues = (changeBudget(venues, curBgt));
        }
        if (type === 2) {    // change type is budget
            //setCurBgt(change);
            console.log("budget", curBgt);
            venues = changeType(venues, ind);
            venues = (changeArea(venues, curAre));
            venues = (changeBudget(venues, change));

        }

        console.log("venues", venues);
        return venues;

    }

    const changeType = (venues, type) => {
        if (type !== 6) {
            var newVenues = [];
            if (venues !== null) {
                venues.forEach(ele => {
                    if (ele.serviceType === type) {
                        newVenues.push(ele);
                    }
                })
            }
        } else {
            return venueList;
        }
        return newVenues;
    }

    const changeArea = (venues, area) => {
        //setCurAre(area);
        if (area !== areType[0]) { //if user select any area
            // console.log('curAre',area);  
            // console.log('resultList',resultList);
            var newVenues = [];
            if (venues != null) {
                venues.forEach(ele => {
                    var location = stringify(ele.serviceLocation).toLowerCase();
                    //console.log(location);
                    if (location.includes(area.toLowerCase())) {
                        //console.log("keep");
                        newVenues.push(ele);
                    }
                })
            }
            return (newVenues);
        } else {
            //console.log(venueList);
            return venues;
        }
    };


    const changeBudget = (venues, bgt) => {
        //setCurBgt(bgt);
        var newBudget = 0;
        switch (bgt) {
            case bgtType[0]: return venues;

            case bgtType[1]: newBudget = 1000;

                break;
            case bgtType[2]: newBudget = 2000;

                break;
            case bgtType[3]: newBudget = 5000;

                break;
            case bgtType[4]: newBudget = 10000;

                break;
            case bgtType[5]: newBudget = 999999999999999;

                break;
            default: newBudget = budget;
                break;
        }

        // if (budget != areType[0]) { //if user select any area
        //console.log('curbgt', newBudget);
        //console.log('resultList', resultList);
        var newVenues = [];
        //venues = venues.filter(venue => venue.price <= newBudget);
        if (venues !== null) {
            venues.forEach(ele => {
                var price = parseInt(ele.price);
                if (price <= newBudget) {
                    //console.log("keep");
                    newVenues.push(ele);
                }
            })
        }

        return (newVenues);
    };


    useEffect(() => {
        getAll(); //store all venues
        console.log(type, date, guest, budget, area, stand, seat)
    }, []);

    // if (!venueList) {
    //     return <li className="eve-row" ><div>Fetching Event Result...</div></li>
    // }

    console.log("resultlist", resultList)
    //console.log("venues", venues)
    return (
        <div>
            {console.log("start rendering")}
            <Navbar />
            <div className="eventSearch">

                <div className='filter'>
                    {/**Service type filter*/}
                    <div className='selection'>
                        <p>Type</p>
                        <div className='right right-service'>

                            <Radio.Group value={curType}>
                                {
                                    serType.map((ele, index) => {
                                        return <Radio value={ele} key={index}
                                            onChange={() => { setCurType(ele); setResultList(filterResult(0, ele)) }}

                                        >{ele}</Radio>
                                    })
                                }
                            </Radio.Group>
                        </div>

                    </div>
                    <hr className='hrSearch' />
                    {/**Area filter*/}
                    <div className='selection'>
                        <p>Area</p>
                        <div className='right right-area'>
                            <Radio.Group value={curAre}>
                                {
                                    areType.map((ele, index) => {
                                        return <Radio value={ele} key={index}
                                            onChange={() => { setCurAre(ele); setResultList(filterResult(1, ele)) }}
                                        >{ele}</Radio>
                                    })
                                }
                            </Radio.Group>
                        </div>
                    </div>
                    <hr className='hrSearch' />
                    {/**Budget filter*/}
                    <div className='selection'>
                        <p>Budget</p>
                        <div className='right right-budget'>
                            <Radio.Group value={curBgt}>
                                {
                                    bgtType.map((ele, index) => {
                                        return <Radio value={ele} key={index}
                                            onChange={() => { setCurBgt(ele); setResultList(filterResult(2, ele)) }}
                                        >{ele}</Radio>
                                    })
                                }
                            </Radio.Group>
                        </div>
                    </div>
                    <hr className='hrSearch' />

                </div>
            </div>
            <div className="events">
                <ul className="eve-col">
                    {
                        (resultList.length!=0) //is there any data remains
                            ?
                            resultList.map((ele, index) => {
                                if (ele.price <= budget && Math.max(ele.guestAmount, ele.seated, ele.standing) >= guest) {

                                    return (
                                        <li className="eve-row" key={index} id="e-valid">
                                            <div className="eve-ele"
                                                key={index}
                                                style={{
                                                    background: `url(${ele.imagePath})`
                                                }}>
                                                <Link className="getService" to={`/result/${ele.servicesId}/intro`}>
                                                    <h3>
                                                        {ele.serviceName.toUpperCase()}
                                                    </h3>

                                                </Link>
                                                
                                                    <h4 style={{
                                                        fontFamily: `"Times New Roman", "Times", "serif"`,
                                                    }}>
                                                        Approx Price: {ele.price}

                                                    </h4>
                                                
                                                    <h4 style={{
                                                        fontFamily: `"Times New Roman", "Times", "serif"`,
                                                    }}>
                                                        Rating: {(ele.rate==null||ele.rate==0)?"N/A":ele.rate}

                                                    </h4>
                                                <Link to="">
                                                    Read Reviews
                                                    
                                                </Link>
                                            </div>
                                        </li>
                                    )
                                }
                            })
                            :
                            <li className="eve-row">
                                {'No Relavent Result ...'}
                            </li>
                          
                    }
                </ul>
            </div>
            <LoadingIndicator/>
            <Footer />
        </div>
    )

}