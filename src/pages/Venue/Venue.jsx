import React, { useState, useEffect } from "react";
import Header from "../../layout/Header";
import Footer from '../Home/homes/Footer';
import { Radio } from 'antd';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './Venue.css';
import Navbar from "../Home/homes/Navbar";
import { stringify } from "rc-field-form/es/useWatch";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { ContainerSASPermissions } from "@azure/storage-blob";

export default function Event() {
    const [venueList, setVenueList] = useState([]);
    const [resultList, setResultList] = useState([]);
    const serType = ["Venue", "Food", "Beverage", "Entertainment", "Florist", "Photographer", "ALL"];
    const areType = ["All", "Hobart", "SandyBay", "Kingston", "NewTown", "South Hobart", "North Hobart", "Dynnyrne"];
    const bgtType = ["All", "$1,000", "$2,000", "$5,000", "$10,000", "10,000+"];
    const [curType, setCurType] = useState("Venue");
    const [curAre, setCurAre] = useState("All");
    const [curBgt, setCurBgt] = useState("All");
    const { type, date, guest, budget, area, stand, seat } = useParams();
    const history = useNavigate();
    //var venues = [];

    // get all services
    const getAll = async () => {
        const { data } = await
            axios.get("https://eventeasyau.azurewebsites.net/api/services/getallservices");    // retrieve all services

        setVenueList(data.$values); //store all venues
        console.log(venueList)
        setResultList(data.$values)
        //venues = venueList;
    };

    // const getServices = async (ind) => {
    //     const { data } = await
    //         axios.get(`https://eventeasyau.azurewebsites.net/api/services/getservicesbytype/${ind}`);    // retrieve all Food

    //     setVenueList(data.$values); //store all venues
    //     console.log(venueList)
    //     setResultList(data.$values)
    //     //venues = venueList;
    // };

    const filterResult = (type, change) => {
        console.log(type, change)
        var venues = venueList.slice();
        var ind = 0;
        console.log("venues", venues);
        if (type == 0) {  // change type is service
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
                    break;
                default: ind = 0;
                    break;
            }
            console.log(curType,curAre,curBgt);
            venues = changeType(venues,ind);
            venues = (changeArea(venues, curAre));
            venues = (changeBudget(venues, curBgt));
        }
        if (type == 1) {   // change type is area/suburbs
            //setCurAre(change);
            console.log("suburb",curAre);
            venues = (changeArea(venues, change));
            venues = (changeBudget(venues,curBgt));
        }
        if (type == 2) {    // change type is budget
            //setCurBgt(change);
            console.log("budget", curBgt);
            venues = (changeArea(venues, curAre));
            venues = (changeBudget(venues, change));
            
        }
        
        console.log("venues", venues);
        return venues;

    }

    const changeType = (venues, type) => {
        if (type != 6) {
            var newVenues = [];
            if (venues!=null) {
                venues.forEach(ele => {
                    if(ele.serviceType==type){
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
        if (area != areType[0]) { //if user select any area
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
            return venueList;
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
        if (venues != null) {
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

    if (!venueList) {
        return <li className="eve-row" ><div>Fetching Event Result...</div></li>
    }

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
                                            onChange={() => { setCurAre(ele); setResultList(filterResult(1, ele))}}
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
                        resultList //is there any data remains
                            ?
                            resultList.map((ele, index) => {
                                if (ele.price <= budget && Math.max(ele.guestAmount, ele.seated, ele.standing) >= guest) {

                                    return (
                                        <li className="eve-row" key={index} id="e-valid">
                                            <div className="eve-ele"
                                                key={index}>
                                                <Link className="getService" to={`/result/${ele.servicesId}`}>
                                                    <h3 style={{ color: 'white', fontSize: '2.7rem', fontFamily: `"Times New Roman", "Times", "serif"`, }}>
                                                        {ele.serviceName}
                                                    </h3>
                                                    <h2 style={{
                                                        color: 'white', fontSize: '1rem',
                                                        fontFamily: `"Times New Roman", "Times", "serif"`,
                                                    }}>
                                                    Budget {ele.price} Rating {ele.rate}
                                                    </h2>
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
            <Footer />
        </div>
    )

}