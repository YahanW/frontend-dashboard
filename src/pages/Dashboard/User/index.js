import React, { Component } from 'react'
import { Panel } from '../../../commons'
import { Card,Form,Input,Button,Table,Space, Avatar,Modal,message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import ModalUser from './ModalUser'
import LevelModal from './LevelModal'

class User extends Component {
    constructor(props){
    super(props);
    this.state = {
        dataSource:[],pagination:{},filters:{}
    }
}
componentDidMount(){
    this.onGetUsers();  //fetching users once upon the element are rendered
    console.log(this.props.records)
}
onGetUsers=(params={})=>{
    
    global.request.get('/api/user/all',params).then(
        data=>{
            this.setState({dataSource:data.records,pagination:data.pagination})
            //get pagination wihle fetching records
        }
    )
}

onSearch=(values)=>{
    this.setState({filters:values})
    this.onGetUsers(values)
}

onAddUser=()=>{
    this.props.dispatch({
        type:'show',
        data:{
            title:'New User',
            data:{},
            refreshList:this.onGetUsers
        }
    })
}
onView=(record)=>{
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
onEdit=(record)=>{
    return ()=>{
        this.props.dispatch({
            type:'show',
            data:{
                title:'Edit',
                data:{...record,location:record.location.split(',')},
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
              global.request.post('/api/user/delete',{id:record.id}).then(data=>{
                message.success('Deletion Success')
                this.onGetUsers()
                
              })
            
            }
          })
    }
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
    onChange:(pagination)=>{
        //passing paging and filter condition
        this.onGetUsers({...pagination, ...this.state.filters})
    },
    pagination:{
        ...this.state.pagination,
        showTotal:(total)=>`total ${total} user records`
    },
    columns:[
        {
            title:"username",
            dataIndex:'username',
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
            dataIndex:'phonenumber'
        },
        {
            title:"Access",
            dataIndex:'access',
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
    1 + 1 == 2 ?
    
    <Panel title="User">
        <Card className='m-filter'>
            <Form layout="inline" onFinish={this.onSearch}>
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
                <Button type='primary' icon={<PlusOutlined/>} onClick={this.onAddUser}>Add User</Button>
            </div>
            <Table {...this.layoutUserTable()}/>
        </Card>
        {userModal&&<ModalUser {...userModal} {...this.props}/>} {/**passing dispatch by props since it is in props */}
        {levelModal&&<LevelModal {...levelModal} {...this.props}/>}
    </Panel>
    :
    <h2>
    YOU HAVE NO PERMISSION TO THIS PAGE
    </h2>
    )
  }
}
const mapStateToProps=(store)=>({userState:store.user})
const mapDispatchToProps=(dispatch)=>({dispatch})
export default connect(mapStateToProps,mapDispatchToProps)(User)