import React, { useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Modal,Button,Input} from 'antd';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import Trolley from './Trolley';
import './style/index.css'

function Header(){
  //checking if modals to appear
  
  const [isMSGVisible, setMSGVisible] = useState(false);
  const [isBookVisible, setBookVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const CancelChat = () => {setChatVisible(false);};
  const showModalChat = () => {setChatVisible(true);};
  const CancelBook = () => {setBookVisible(false);};
  const showModalBook = () => {setBookVisible(true)};
  const showModalMSG = () => {setMSGVisible(true);};
  const CancelMSG = () => {setMSGVisible(false);};

  //navigate to specific page
  const history = useNavigate();
  const goGeo = ()=>{
    history("/geo")
  }
    return (
      <div className='m-header-b'>
       <div className='location'>
        <h1 style={{color:'#ffffff'}}>Hobart</h1> 
        <a onClick={goGeo}>Change Location ?</a>
       </div>

        <input type="checkbox" class="nav-toggle" id="nav-toggle"></input>
        <div className='trolley'>
          <ul>
            {/* home page direction */}
            <li>
              <Link to='/' className="tro-item">
                Home
              </Link>
            </li>
            {/* message age popput */}
            <li>
              <a  onClick={showModalMSG} className="tro-item">Inbox</a>
              <Modal title="MESSAGE LIST" mask={false}
                    visible={isMSGVisible} footer={false} onCancel={CancelMSG}
                    className="msg-list">
                    <div onClick={showModalChat} style={{cursor:'pointer'}}>
                      <h2>Merchant</h2>
                      <h4 style={{backgroundColor:'#FFEAC9'}}>Hi, There</h4>
                    </div>
                    <Modal title="From Merchant" mask={false}
                    visible={chatVisible} footer={false} onCancel={CancelChat}
                    className="chatBox"
                    >
                      <div style={{ position: "relative", height: "500px" }}>
                        <MainContainer>
                          <ChatContainer>
                            <MessageList>
                              <Message
                                model={{
                                  message: "Hello my friend",
                                  sentTime: "just now",
                                  sender: "Joe",
                                }}
                              />
                              <Message model={{
                                message: "Hi,Joe",
                                sentTime: "just now",
                                sender: "Akane",
                                direction: "outgoing",
                                position: "single"
                              }} />
                            </MessageList>
                            <MessageInput placeholder="Type message here" />
                          </ChatContainer>
                        </MainContainer>
                      </div>
                    </Modal>
              </Modal>
            </li>
            {/* booking list */}
            <li>
              <a  onClick={showModalBook} className="tro-item">Booking</a>
              <Modal title="Booking LIST" mask={false}
                    visible={isBookVisible} footer={false} onCancel={CancelBook}
                    className="shop-list">
              </Modal>
            </li>
            {/* trolley item list */}
            <li>
              <Trolley/>
            </li>
            {/* remainder user to login */}
            <li>
              
              {
                sessionStorage.getItem('username')
                ?
                (<Link to='/profile' className="tro-item tro-name"> 
                {sessionStorage.getItem('username').toUpperCase()}
                 </Link>)
                :
                (<Link to='/login' className="tro-item tro-name"> 
                {"Login"}
                 </Link>)
              }
             
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