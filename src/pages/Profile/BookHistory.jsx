import React,{useState} from "react";
import Header from "../../layout/Header";
import './History.css';
import {Carousel} from 'antd';
import {Link} from 'react-router-dom';

function BookHsitory(){
    const images = [{
        id:1323,
        source:"https://theconferenceshop.com.au/wp-content/uploads/2020/07/Hobart-2.jpg"
    },{
        source:"https://spie.org/images/Graphics/CE/DCS/2021/Special-Events-Technical-2.jpg",
        id:244,
    },{
        id:344,
        source:"https://betasmania.com.au/wp-content/uploads/2020/07/mr-i-with-mr-ii_44478028070_o-scaled-1536x810.jpg"
    }]
    const [status,setStatus] = useState(1);

    return(
        <div>
            <Header/>
           <div className="history-book">
            <div className="history-title">
                <h1>KID BIRTHDAY PARTY</h1>
                <h3>October 16,2022 9:00 AM - 7:00 PM</h3>
            </div>   
            <Carousel autoplay className="slice-show" >
            {
            images.map((ele,index)=>{
                return  <div className="slide">
                <h3 style={
                    {   
                        backgroundImage:`url(${ele.source})`,
                        height: '160px',
                        color: '#fff',
                        lineHeight: '160px',
                        textAlign: 'center',
                        backgroundSize:'cover'
                    }}>{ele.id}</h3>
                </div>
            })
            
            }
                    
            </Carousel>
            <div className="Details">
                <div className="detail">
                    <h2>Details</h2>
                    Date
                    <p>October 16</p>
                    Time
                    <p>9:00 am - 7:00 pm6</p>
                    Service Type
                    <p>Birthdat&Private</p>
                </div>
                <div className="detail">
                    <h2>Venue</h2>
                    <p>SandyBay Entertainment</p>
                    <p>1 Churchchill Ave, SandyBay TAS 7005</p>
                </div>
                <div className="detail">
                    <h2>Merchant</h2>
                    <p>LILY KID SERVICE</p>
                    Email
                    <p>Lly@gmail.com</p>
                </div>
            </div>

            {
                status==0?
                <button id='bk-cancel'>
                    <Link className="bookLink" to="/profile/booking/cancel"
                   >
                    CANCEL
                    </Link>
                </button>
                :
                <button id='bk-review'>
                    <Link className="bookLink" to="/profile/booking/review"
                    >
                    REVIEW
                    </Link>
                </button>
                // style={{backgroundColor:'brown',color:'white'}}
                // style={{backgroundColor:'rgb(196, 139, 48)',color:'white'}}
            }
            
           </div>
           
        </div>
    )
}

export default BookHsitory;