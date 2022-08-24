import React, { useState,useEffect } from 'react';
import { Panel } from '../../../commons';
import { Card,Form,Input,Button,Table,Space, Avatar,Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector,useDispatch,useStore } from 'react-redux';
import ModalUser from './ModalUser';
import LevelModal from './LevelModal';
import axios from 'axios';
import * as ModalAction from '../../../reducer/index';

export default function User(props){

const [record,setRecord] = useState({
        dataSource:[],
        //pagination:{},
        filters:{}
    })
const selector = useSelector(state=>state);
const dispatch = useDispatch();

useEffect(()=>{
    onGetUsers();  //fetching users once upon the element are rendered
    console.log(record);
},[])
const onGetUsers=(params={})=>{
    
    axios.get("https://eventeasynew.azurewebsites.net/api/user/GetAll")
    .then( data=>{
        //console.log(data.data.$values)
        setRecord({...record, dataSource:data.data.$values})
            //pagination:{data.length,5}
        //get pagination wihle fetching records
    })
    // global.request.get('/api/user/all',params).then(
    //     data=>{
    //         this.setState({dataSource:data.records,
    //             //pagination:{data.length,5}
    //         })
    //         //get pagination wihle fetching records
    //     }
    // )
}

// onSearch=(values)=>{
//     this.setState({filters:values})
//     this.onGetUsers(values)
// }
const onAddUser=()=>{
    dispatch({type:'show',data:{
                title:'New User',
                data:{},
                refreshList:onGetUsers
            }})
}
const onView=(record)=>{
    console.log(record)
    return ()=>{
        this.props.dispatch({
            type:'show',
            data:{
                title:'User Details',
                data:{...record,location:record.location.split(',')},
            }
        })
    }
}
// onEdit=(record)=>{
//     return ()=>{
//         this.props.dispatch({
//             type:'show',
//             data:{
//                 title:'Edit',
//                 data:{...record,location:record.location.split(',')},
//                 refreshList:this.onGetUsers
//             }
//         })
//     }
// }
// onDelete=(record)=>{
//     return ()=>{
//         Modal.confirm({
//             //a pop up window
//             title:'Warning',
//             content:'Are you sure to delete this record?',
//             onOk:()=>
//             {
//               global.request.post('/api/user/delete',{id:record.id}).then(data=>{
//                 message.success('Deletion Success')
//                 this.onGetUsers()
                
//               })
            
//             }
//           })
//     }
// }
// onLeverage=(record)=>{
//     return ()=>{
//         this.props.dispatch({
//             //passing type 'showLevelModal' to visiable level modal
//             type:'showLevelModal',  //calling level management modal
//             data:{
//                 title:'Level Up',   //give title
//                 data:{...record},     //passing user record
//                 refreshList:this.onGetUsers //after level configuration, refresh data list required
//             }
//         })
//     }
// }
//Username Password Phonenumber Email 
const layoutUserTable=()=>({
    // onChange:(pagination)=>{
    //     //passing paging and filter condition
    //     this.onGetUsers({...pagination, ...this.state.filters})
    // },
    // pagination:{
    //     ...this.state.pagination,
    //     showTotal:(total)=>`total ${total} user records`
    // },
    columns:[
        {
            title:"username",
            dataIndex:'userName',
            render:(text,record)=>{
                return <Space>
                    <Avatar src={record.profile}/>
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
                    {/* <a onClick={this.onView(record)}>View</a>
                    <a onClick={this.onEdit(record)}>Edit</a>
                    <a onClick={this.onDelete(record)}>Delete</a>
                    <a onClick={this.onLeverage(record)}>LevelUp</a> */}
                </Space>
            }
        }
    ],
    dataSource:record.dataSource

})

    const {userModal,levelModal}=selector.user;
    return (
   
    <Panel title="User">
        <Card className='m-filter'>
            <Form layout="inline" //onFinish={this.onSearch}
            >
                <Form.Item label="username" name="uname">
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Search</Button>
                    {/**htmlType submit so form get data */}
                </Form.Item>
            </Form>
        </Card>
        <Card>
            <div className='m-operate'>
                <Button type='primary' icon={<PlusOutlined/>} onClick={onAddUser}>Add User</Button>
            </div>
            <Table {...layoutUserTable()}/>
        </Card>
        {userModal&&<ModalUser {...userModal} {...props}/>} 
        {levelModal&&<LevelModal {...levelModal} {...props}/>}
    </Panel>
   
    )
  }
