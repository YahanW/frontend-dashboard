import React , {useState} from "react";
import Header from "../../layout/Header";
import {Link, Outlet} from 'react-router-dom';

function ItemIntro(){
    const [reviewOrSale,setRS] = useState(false);
    const changeRS = () =>{
        setRS(!reviewOrSale);
    }
    return (
        <div className="selecs">
            <Header/>
            <div className="selecBox">
                <div className="selection">

                </div>
            </div>
            <div className="detail-review">
                <div className='dr-sub'
                style={{borderBottom:reviewOrSale?'3px solid #33A1C9':''}}
                >
                    <Link onClick={changeRS} to="/result/details/intro">DETAILS</Link>
                </div>
                <div className='dr-sub'
                style={{borderBottom:reviewOrSale?'':'3px solid #33A1C9'}}
                >
                    <Link onClick={changeRS} to="/result/details/review">REVIEWS</Link>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default ItemIntro;