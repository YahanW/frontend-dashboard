import React, { Component } from 'react';
import { Panel } from '../../../commons';
import { Card,Form,Input,Button,Table,Space, Avatar,Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import ModalUser from './ModalUser';
import LevelModal from './LevelModal';
import axios from 'axios';
import { usePromiseTracker } from 'react-promise-tracker';
import { ThreeDots } from 'react-loader-spinner';

class User extends Component {
    constructor(props){
    super(props);
    this.state = {
        dataSource:[],
    }
}
LoadingIndicator = () => {
        const { promiseInProgress } = usePromiseTracker;
        return (
            promiseInProgress && 
            <div style={{ marginLeft: "14vw" }}>
                <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>

        );
    }
componentDidMount(){
    this.onGetUsers();  //fetching users once upon the element are rendered
}
onGetUsers=()=>{

    axios.get("https://eventeasyau.azurewebsites.net/api/user/getactiveuser")
    .then( data=>{
        this.setState({dataSource:data.data.$values})
    })
}

// onSearch=(values)=>{
//     this.setState({filters:values})
//     this.onGetUsers(values)
// }

onAddUser=()=>{
    this.props.dispatch({
        type:'show',
        data:{
            title:'New User',
            data:{},
            refreshList:this.onGetUsers //passing a function
        }
    })
}
onView=(record)=>{
    //console.log(record)
    return ()=>{
        this.props.dispatch({
            type:'show',
            data:{
                title:'User Details',
                data:record
            }
        })
    }
}
onEdit=(record)=>{
    return ()=>{
        this.props.dispatch({
            type:'show',
            data:{
                title:'Edit',
                data:record,
                refreshList:this.onGetUsers
            }
        })
    }
}

onDelete=(record)=>{
    return ()=>{
        Modal.confirm({
            //a pop up window
            title:'Warning',
            content:'Are you sure to delete this record?',
            onOk:()=>
            {
              axios.delete(`https://eventeasyau.azurewebsites.net/api/user/deleteuser/${record.userId}`,
              )
              .then(data=>{
                console.log(data)
                message.success('Deletion Success')
                this.onGetUsers()
                
              }).catch(err=>{
                console.log(err)
              })
            
            }
          })
    }
}
onSearch=(name)=>{
    axios.get(`https://eventeasyau.azurewebsites.net/api/user/searchuserbyname/${name}`)
        .then(data => {
            this.setState({ dataSource: data.data.$values })
        })
}
onLeverage=(record)=>{
    return ()=>{
        this.props.dispatch({
            //passing type 'showLevelModal' to visiable level modal
            type:'showLevelModal',  //calling level management modal
            data:{
                title:'Level Up',   //give title
                data:{...record},     //passing user record
                refreshList:this.onGetUsers //after level configuration, refresh data list required
            }
        })
    }
}
//Username Password Phonenumber Email 
layoutUserTable=()=>({
    pagination:{
        pageSize:10,
        showTotal:()=>`total ${this.state.dataSource.length} user records`
    },
    columns:[
        {
            title:"username",
            dataIndex:'userName',
            render:(text,record)=>{
                return <Space>
                    <Avatar src={`https://easyevent.blob.core.windows.net/image/${record.tokenNumber}`}/>
                    {text}
                </Space>
            }
        },
        {
            title:"email",
            dataIndex:'email'
        },
        {
            title:"phone",
            dataIndex:'phoneNumber'
        },
        {
            title:"Access",
            dataIndex:'accessNumber',
            render:(record)=>{
                return record==3?'Merchant':(record==5?'Customer':record==1?'Admin':'Something Wrong')
            }
        },
        {
            title:'operate',
            render:(record)=>{
                return <Space>
                    <a onClick={this.onView(record)}>View</a>
                    <a onClick={this.onEdit(record)}>Edit</a>
                    <a onClick={this.onDelete(record)}>Delete</a>
                    <a onClick={this.onLeverage(record)}>LevelUp</a> 
                    
                </Space>
            }
        }
    ],
    dataSource:this.state.dataSource

})

render() {
    const {userModal,levelModal}=this.props.userState
    return (
   <>
    <Panel title="User">
        <Card >
            <Form className='functions' layout="inline" >
                <Form.Item label="Search" name="name">
                    <input type='text' placeholder="username, firstname or lastname" onKeyUp={(e)=>this.onSearch(e.target.value)}/>
                </Form.Item>
                
                <Button className='addUser' type='primary' style={{ marginLeft: "45vw" }} icon={<PlusOutlined />} onClick={this.onAddUser}>Add User</Button>
            </Form>


            

            <Table className='table' {...this.layoutUserTable()}/>
        </Card>
        {userModal&&<ModalUser {...userModal} {...this.props}/>} {/**passing dispatch by props since it is in props */}
        {levelModal&&<LevelModal {...levelModal} {...this.props}/>}
    </Panel>
    {/* <loadingIndicator /> 不好用 */}
    </>
   
    )
  }
}
const mapStateToProps=(store)=>({userState:store.user})
const mapDispatchToProps=(dispatch)=>({dispatch})
export default connect(mapStateToProps,mapDispatchToProps)(User)