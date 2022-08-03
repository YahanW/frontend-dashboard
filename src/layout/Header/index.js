import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { Modal,Button} from 'antd';

import './style/index.css'
function Header(){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {setIsModalVisible(true);};
  const handleCancel = () => {setIsModalVisible(false);};

    return (
      <div className='m-header'>
       <div className='location'>
        <h1 style={{color:'#ffffff'}}>Hobart</h1> 
        <a>Change Location ?</a>
       </div>
        <input type="checkbox" class="nav-toggle" id="nav-toggle"></input>
        <div className='trolley'>
          <ul>
            <li>
              <Link to='/profile' className="tro-item"> 
              {
                sessionStorage.getItem('email')
              }
              </Link>
            </li>
            <li>
              <Link to='/' className="tro-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="#" className="tro-item">Inbox</Link>
            </li>
            <li>
              <Link to="#" className="tro-item">Bookings</Link>
            </li>

            <li>
              <a  onClick={showModal} className="tro-item">Trolley</a>
              <Modal title="EVENT TROLLEY" 
                     visible={isModalVisible} footer={false}onCancel={handleCancel}
                     className="shop-list"
              >
                <ul>
                  <li>
                    <Link to="/checkout">
                      <h3>SERVICE NAME</h3>
                      <h4>MERCHANT</h4>
                      <h4>accept</h4>
                    </Link>
                  </li>
                  <li>
                    <h3>SERVICE NAME</h3>
                    <h4>MERCHANT</h4>
                    <h4>accept</h4>
                  </li>
                </ul>
              </Modal>
            </li>
          </ul>
        </div>

        <label for="nav-toggle" class="nav-toggle-label">
          <span></span>
        </label>
      </div>
      
    )
}
export default Header;