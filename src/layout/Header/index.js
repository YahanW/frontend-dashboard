import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { Modal,Button,Input} from 'antd';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";


import './style/index.css'
function Header(){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMSGVisible, setMSGVisible] = useState(false);
  const [isBookVisible, setBookVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const CancelChat = () => {setChatVisible(false);};
  const showModalChat = () => {setChatVisible(true);};

  const CancelBook = () => {setBookVisible(false);};
  const showModalBook = () => {setBookVisible(true)};
  const showModalMSG = () => {setMSGVisible(true);};
  const showModalCheck = () => {setIsModalVisible(true);};
  const CancelCheck = () => {setIsModalVisible(false);};
  const CancelMSG = () => {setMSGVisible(false);};
  const [isSent,setIsSent] = useState(true);
  const [isAccept,setAccept] = useState(true);
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
              <Link to='/' className="tro-item">
                Home
              </Link>
            </li>
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
            <li>
              <a  onClick={showModalBook} className="tro-item">Booking</a>
              <Modal title="Booking LIST" mask={false}
                    visible={isBookVisible} footer={false} onCancel={CancelBook}
                    className="shop-list">

              </Modal>
            </li>

            <li>
              <a  onClick={showModalCheck} className="tro-item">Trolley</a>
              <Modal title="EVENT TROLLEY" mask={false}
                     visible={isModalVisible} footer={false}onCancel={CancelCheck}
                     className="shop-list"
              >
                <ul>
                  <li 
                  // style={{backgroundColor:isAccept?'#80ED99':'red'}} 
                  >
                    <div className='avatar'>
                    </div>
                      <div className='left'>
                        <h3 >EVENT NAMEdsdsdsddddddddddddddddddddddddddddddddddddddddddddddddd</h3>
                        <h5>MERCHANT NAME</h5>
                        <h4 style={{color:isAccept?'#B5FFD9':'red'}}>
                       
                        accept
                      
                          </h4>
                      </div>
                      <div className='right'>
                      <button>
                        {
                          isSent?(
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
                  <li 
                  // style={{backgroundColor:isAccept?'#80ED99':'red'}} 
                  >
                    <div className='avatar'>
                    </div>
                      <div className='left'>
                        <h3 >EVENT NAMEdsdsdsddddddddddddddddddddddddddddddddddddddddddddddddd</h3>
                        <h5>MERCHANT NAME</h5>
                        <h4 style={{color:isAccept?'#B5FFD9':'red'}}>
                       
                        accept
                      
                        </h4>
                      </div>
                      <div className='right'>
                      <button>
                        {
                          isSent?(
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
                  <li 
                  // style={{backgroundColor:isAccept?'#80ED99':'red'}} 
                  >
                    <div className='avatar'>
                    </div>
                      <div className='left'>
                        <h3 >EVENT NAMEdsdsdsddddddddddddddddddddddddddddddddddddddddddddddddd</h3>
                        <h5>MERCHANT NAME</h5>
                        <h4 style={{color:isAccept?'#B5FFD9':'red'}}>
                       
                        accept
                      
                          </h4>
                      </div>
                      <div className='right'>
                      <button>
                        {
                          isSent?(
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
                  <li 
                  // style={{backgroundColor:isAccept?'#80ED99':'red'}} 
                  >
                    <div className='avatar'>
                    </div>
                      <div className='left'>
                        <h3 >EVENT NAMEdsdsdsddddddddddddddddddddddddddddddddddddddddddddddddd</h3>
                        <h5>MERCHANT NAME</h5>
                        <h4 style={{color:isAccept?'#B5FFD9':'red'}}>
                       
                        accept
                      
                          </h4>
                      </div>
                      <div className='right'>
                      <button>
                        {
                          isSent?(
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
                </ul>
              </Modal>
            </li>
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