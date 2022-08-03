import React , {useState,useEffect} from "react";
import FormControl from '@mui/material/FormControl';
import Header from "../../layout/Header";
import moment from 'moment';
import { DatePicker,Button,Select} from 'antd';
import {Link, Outlet} from 'react-router-dom';
import './ItemIntro.css'
function ItemIntro(){
    //const docRef = React.createRef();
    const [reviewOrSale,setRS] = useState(false);
    const [imgIndex,setImgIndex] = useState(0);
    
    const changeRS = () =>{ setRS(!reviewOrSale);}
    const dateFormat = 'YYYY/MM/DD';
    const { Option, OptGroup } = Select;
    const imgDemo = [{
        source:'https://www.christies.com/media-library/images/features/articles/2019/04/02/andrew-graham-dixon-on-the-night-watch-by-rembrandt/rembrandtharmenszvanrijnmilitiacompanyofdistrictiiunderthecommandofcaptainfransbanninckcocqknownasthenightwatch16422400.jpg?w=780'
    },{
        source:'https://i1.lsqww.com/0b461f2c14cdba53c84c/551f5e74/561f5d75/09455d7049c6e649c812b2.png'
    },{
        source:'https://artnewsnet.com/wp-content/uploads/2018/10/3-15.jpg'
    }];
    
    const incre = (n) => {
        setImgIndex(n)
    }
    
    return (
        <div>
            <Header/>
            <div className="selecBox">
                <div className="selection">
                    <h1>Simple and True Art Workshop</h1>
                    <div className="selc-shop" >
                        <div className="imagesub">
                        {
                            imgDemo.map((ele,index)=>{
                                return <div className="imgsub" onClick={()=>incre(index)}
                                key={index} style={{backgroundImage:`url(${ele.source})`}}></div>
                            })
                        }
                        </div>
                        <div className="imageShow" name="imageShow" style={{backgroundImage:`url(${imgDemo[imgIndex].source})`}}></div>
                      
                       
                        <FormControl className="right">
                            <p>Event Date</p>
                            <DatePicker defaultValue={moment('2015/01/01', dateFormat)} 
                            format={dateFormat} className="sel-pick" />
                            <p>Service Type</p>
                            <Select defaultValue="2" style={{ width: '100%' }} className="sel-pick">
                                <OptGroup label="Morning">
                                <Option value="1">BREAK-FAST</Option>
                                <Option value="2">COOKIES</Option>
                                </OptGroup>
                                <OptGroup label="Night">
                                <Option value="4">SUSHI</Option>
                                </OptGroup>
                            </Select>
                            <p>Event Size</p>
                            <Select defaultValue="2" style={{ width: '100%' }} className="sel-pick">
                                <OptGroup label="BIG">
                                <Option value="1">WEDDING</Option>
                                <Option value="2">FEAST-CORPORATE</Option>
                                </OptGroup>
                                <OptGroup label="SMALL">
                                <Option value="4">BIRTHDAY</Option>
                                </OptGroup>
                            </Select>
                            <Button type="primary">MAKE REQUEST</Button>
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className="detail-review">
                <div className='dr-sub'
                style={{backgroundColor:reviewOrSale?'':'bisque',}}
                >
                    <Link onClick={changeRS} to="/result/details/intro">DETAILS</Link>
                </div>
                <div className='dr-sub'
                style={{ backgroundColor:reviewOrSale?'bisque':'',}}
                >
                    <Link onClick={changeRS} to="/result/details/review">REVIEWS</Link>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default ItemIntro;