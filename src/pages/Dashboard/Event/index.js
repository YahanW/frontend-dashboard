import React, { Component } from 'react';
import { Panel } from '../../../commons';
import { Card,Form,Input,Table,Space, Avatar,Menu, Dropdown } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import axios from 'axios';
import EventModal from './EventModal';

class Event extends Component {
    constructor(props){
        super(props);
        this.state = {
                dataSource:[],
        }
    }
    componentDidMount(){
        this.onGetEvents();  //fetching users once upon the element are rendered
    }
    onGetEvents=()=>{
        if(sessionStorage.getItem('access')==1){
            axios.get("https://eventeasyau.azurewebsites.net/api/event/getall")
            .then( data=>{
                this.setState({dataSource:data.data.$values})
                console.log(data.data.$values)
            })
        }
        if(sessionStorage.getItem('access')==3){
            axios.get(`https://eventeasyau.azurewebsites.net/api/event/GetEventByMerc/${sessionStorage.getItem('id')}`)
            .then( data=>{
                this.setState({dataSource:data.data.$values})
                console.log(data.data.$values)
            })
        }
    }
    onView=(record)=>{
        return ()=>{
            this.props.dispatch({
                type:'show',
                data:{
                    title:'Event Details',
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
                    data:record
                }
            })
        }
    }
    menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
              'abc'
              ),
            },
            
          ]}
        />
      );



    //Render Event List in Table format
    layoutEventTable=()=>({
    pagination:{
        pageSize:10,
        showTotal:()=>`total ${this.state.dataSource.length} user records`
    },
    columns:[
        {
            title:"Event Name",
            dataIndex:'eventName',
        },
        {
            title:"Start Time",
            dataIndex:'startTime',
        },
        {
            title:"End Time",
            dataIndex:'endTime'
        },
        {
            title:"Booking Status",
            dataIndex:'status',
            render:(record)=>{
                switch(record){
                  case 0:return "Init"; break;
                  case 1:return "Sent"; break;
                  case 2:return "Accepted"; break;
                  case 3:return "Rejected"; break;
                  case 4:return "Cancelled"; break;
                  case 5:return "AwaitPaid"; break;
                  case 6:return "Completed"; break;
                  default: break;
                }
              }
        },
        {
            title:"Event ID",
            dataIndex:'eventId'
        },
        {
            title:'operate',
            render:(record)=>{
                return <Space>
                     <a onClick={this.onView(record)}>View</a>
                    <a onClick={this.onEdit(record)}>Edit</a>
                    {/* 
                    <a onClick={this.onDelete(record)}>Delete</a>
                     */}
                </Space>
            }
        }
    ],
    
    dataSource:this.state.dataSource

})
  render() {
    const {eventModal}=this.props.eventState
    return (
        <Panel title="User">
        <Card className='m-filter'>
            <Form layout="inline" //onFinish={this.onSearch}
            >
                <Form.Item label="username" name="uname">
                    <Input/>
                </Form.Item>
            </Form>
        </Card>
        <Card>
            <Table {...this.layoutEventTable()}/>
        </Card>
        {eventModal&&<EventModal {...eventModal} {...this.props}/>} 
        {/**passing dispatch by props since it is in props */}
    </Panel>
    )
  }
}
const mapStateToProps=(store)=>({eventState:store.event})
const mapDispatchToProps=(dispatch)=>({dispatch})
export default connect(mapStateToProps,mapDispatchToProps)(Event)
