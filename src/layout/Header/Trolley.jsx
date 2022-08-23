import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import './style/index.css';
export default function Trolley(){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isServiceVisible, setServiceVisible] = useState(false);
    const showModalCheck = () => {setIsModalVisible(true);};
    const CancelCheck = () => {setIsModalVisible(false);};
    const CancelService = () => {setServiceVisible(false);};
    const sentRequest = (isAccept)=>{
        if(isAccept===false){
            console.log("Make request")
        }
    }
    const events = [
        {"eventName":"Wedding Ceremony",
        "token":"E1U12-23aug-1",
        "merchant":"Stark",
        "accept":false,},
        {"eventName":"Corporate Party",
        "token":"E2U12-23aug-2",
        "merchant":"Elon",
        "accept":true,},]
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
                        <li>
                        <div className='avatar' onClick={()=>setServiceVisible(true)}>
                            Services
                        </div>
                        <div className='left'>
                            <h3>{ele.eventName}</h3>
                            <h5>{ele.merchant}</h5>
                            <h4 style={{color:ele.accept?'#B5FFD9':'red'}}>   
                            {ele.accept?'Accepted':'Waiting'}
                              </h4>
                          </div>
                          <div className='right' >
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



                <Modal title="Services" width={600} 
                     visible={isServiceVisible} footer={false} onCancel={CancelService}
                     className="shop-list"
                >
                     <ul>
                            <li><div className='avatar'></div>
                          <div className='left'>
                            <h3>Service Name</h3>
                            <h4>   
                            Size
                            </h4>
                          </div>
                          <div className='right'>
                            <button>
                            
                             Remove
                            </button>
                          </div>
                      </li>
                </ul>
                </Modal>
              </Modal>
        </div>
    )
}