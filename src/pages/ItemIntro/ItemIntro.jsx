import React , {useState} from "react";
import FormControl from '@mui/material/FormControl';
import Header from "../../layout/Header";
import moment from 'moment';
import { DatePicker,Button,Select} from 'antd';
import {Link, Outlet} from 'react-router-dom';
import './ItemIntro.css'
function ItemIntro(){
    const [reviewOrSale,setRS] = useState(false);
    const changeRS = () =>{ setRS(!reviewOrSale);}
    const dateFormat = 'YYYY/MM/DD';
    const { Option, OptGroup } = Select;
    return (
        <div>
            <Header/>
            <div className="selecBox">
                <div className="selection">
                    <h1>Wedding Decorations: Homewares, Lighting, LUCASA, Jewellery,Clothing</h1>
                    <div className="selc-shop">
                        <div className="imagesub">
                            <div className="imgsub" style={{backgroundImage:`url('https://i.pinimg.com/736x/3c/36/26/3c3626b67e7fb484f309166568417dd4.jpg')`}}></div>
                            <div className="imgsub" style={{backgroundImage:`url('https://i.pinimg.com/236x/fd/95/01/fd9501f45318863d7902c57d5c5ec20e--artist-art-michelangelo.jpg')`}}></div>
                            <div className="imgsub" style={{backgroundImage:`url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfTEuYlNEL85uQ_FBTfqqk0WgyjI2GIOrMP0ipr4JU5_mA8ZpyfRMxdN7u9WZetzL0IIs&usqp=CAU')`}}></div>
                            <div className="imgsub"></div>
                        </div>
                        <div className="imageShow"></div>
                       
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
                style={{borderBottom:reviewOrSale?'3px solid #33A1C9':'',backgroundColor:reviewOrSale?'':'bisque',}}
                >
                    <Link onClick={changeRS} to="/result/details/intro">DETAILS</Link>
                </div>
                <div className='dr-sub'
                style={{borderBottom:reviewOrSale?'':'3px solid #33A1C9', backgroundColor:reviewOrSale?'bisque':'',}}
                >
                    <Link onClick={changeRS} to="/result/details/review">REVIEWS</Link>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default ItemIntro;