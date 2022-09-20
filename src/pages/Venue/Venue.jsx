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

export default function Event() {
    const [venueList, setVenueList] = useState([]);
    const [resultList, setResultList] = useState([]);
    const serType = ["0-50", "Food", "Beverage", "Entertainment", "Florist", "Photographer","Others"];
    const areType = ["All", "Hobart", "SandyBay", "Kingston", "NewTown", "South Hobart", "North Hobart", "Dynnyrne"];
    const bgtType = ["All", "$1,000", "$2,000", "$5,000", "$10,000", "10,000+"];
    const [curType, setCurType] = useState("All");
    const [curAre, setCurAre] = useState("All");
    const [curBgt, setCurBgt] = useState(0);
    const { type, date, guest, budget, area, stand, seat } = useParams();
    const history = useNavigate();

    // get venues
    const getVenue = async () => {
        const { data } = await
            axios.get("https://eventeasyau.azurewebsites.net/api/services/getservicesbytype/0");    // retrieve all venues
        
        setVenueList(data.$values); //store all venues
        console.log(venueList)
        setResultList(data.$values)
    };

    const changeBudget = (bgt) => {
        setCurBgt(bgt);
        var newBudget = 0;
        switch (bgt) {
            case bgtType[0]: return venueList;

            case bgtType[1]:newBudget = 1000;
                
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
            console.log('curbgt', newBudget);
            setResultList([]);
            console.log('resultList', resultList);
            var venues = [];
            if (resultList != null) {
                resultList.map((ele, index) => {
                    var price = parseInt(ele.price);
                    if (price<=newBudget) {
                        console.log(ele);
                        venues.push(ele);
                    }
                })
            }

            return (venues);
    };

    const changeArea = (area) => {
        setCurAre(area);
        if (area != areType[0]) { //if user select any area
            // console.log('curAre',area);  
            setResultList([]);
            // console.log('resultList',resultList);
            var venues = [];
            if(resultList!=null){
            resultList.map((ele, index) => {
                var location = stringify(ele.serviceLocation);
                if (location.includes(area)) {
                    // console.log(ele);
                    venues.push(ele);
                }
            })}

            return (venues);
        } else {
            // console.log('all areas', areType[0]);  
            return (venueList);
        }
    };

    useEffect(() => {
        getVenue(); //store all venues
        console.log(type, date, guest, budget, area, stand, seat)
    }, []);

    if (!venueList) {
        return <li className="eve-row" ><div>Fetching Event Result...</div></li>
    }

    console.log("render before return", resultList)
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
                                            onChange={() => { setCurType(ele) }}

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
                                            onChange={() => {setResultList(changeArea(ele)); console.log("area changed to ",curAre);}}
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
                                            onChange={() => {setResultList(changeBudget(ele)) }}
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
                                                    <h4 style={{
                                                        color: 'white', fontSize: '1rem',
                                                        fontFamily: `"Times New Roman", "Times", "serif"`,
                                                    }}>
                                                        {'Learn More'}

                                                    </h4>
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