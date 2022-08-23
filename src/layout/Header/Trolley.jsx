import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import './style/index.css';
export default function Trolley(){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModalCheck = () => {setIsModalVisible(true);};
    const CancelCheck = () => {setIsModalVisible(false);};
    const sentRequest = (isAccept)=>{
        if(isAccept===false){
            console.log("Make request")
        }
    }
    const events = [{
    "eventName":"Wedding Ceremony",
    "token":"E1U12-23aug-1",
    "merchant":"Stark",
    "accept":false,
},]
    return (
        <div>
             <a  onClick={showModalCheck} className="tro-item">Trolley</a>
             <Modal title="EVENT TROLLEY" mask={false} width={600} 
                     visible={isModalVisible} footer={false}onCancel={CancelCheck}
                     className="shop-list"
              >
                <ul>
                 {
                    events.map((ele,index)=>{
                        return (
                            <li><div className='avatar'></div>
                          <div className='left'>
                            <h3>{ele.eventName}</h3>
                            <h5>{ele.merchant}</h5>
                            <h4 style={{color:ele.accept?'#B5FFD9':'red'}}>   
                            {ele.accept?'Accepted':'Waiting'}
                              </h4>
                          </div>
                          <div className='right'>
                          <button onClick={()=>sentRequest(ele.accept)}>
                            {
                              ele.accept?(
                                <Link to="/checkout">             
                              checkout    
                            </Link>
                              ):(
                                'Request'
                              )
                            }
                            </button>
                          </div>
                      </li>
                        )
                    })
                 }
                </ul>
              </Modal>
        </div>
    )
}