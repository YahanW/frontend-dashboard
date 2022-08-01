import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { Modal,Button} from 'antd';

import './style/index.css'
function Header(){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {setIsModalVisible(true);};
  const handleOk = () => {setIsModalVisible(false);};
  const handleCancel = () => {setIsModalVisible(false);};

    return (
      <div className='m-header'>
       <div className='location'>
        <h1>Hobart</h1> 
        <a>Change Location ?</a>
       </div>
        <input type="checkbox" class="nav-toggle" id="nav-toggle"></input>
        <div className='trolley'>
          <ul>
            <li>
              <Link to='/profile' className="selec"> 
              {
                sessionStorage.getItem('email')
              }
              </Link>
            </li>
            <li>
              <Link to='/' className="selec">
                Home
              </Link>
            </li>
            <li>
              <Link to="#">Inbox</Link>
            </li>
            <li>
              <Link to="#">Bookings</Link>
            </li>
            <li>
              <a  onClick={showModal}>Trolley</a>
              <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk}>
                <Button type="primary">
                  <Link to="/checkout" type='primary'>CheckOut</Link>
                </Button>
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