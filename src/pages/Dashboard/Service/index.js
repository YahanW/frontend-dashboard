import React, { Component } from 'react';
import { Button, Card, Table, Space, Modal, message } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import { Panel } from '../../../commons';
import { connect } from 'react-redux';
import ModalForm from './ModalForm';
import axios from 'axios';

class Service extends Component {
constructor(props){
  super(props)
  this.state={dataSource:[]}
}
onCreate = () =>{
  //pop up window
  this.props.dispatch({
    type:'show',
    data:{
      title:'Add Service',
      data:{ },
      refreshList:this.onGetEvents  
      //passing service list so as to be used later
    }
  })
}
onDetail=(record)=>{
  return ()=>{
    console.log(record)
    this.props.dispatch({
      type:'show',
      data:{
        title:'Details',
        data:record
        //passing service list so as to be used later
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
        //passing service list so as to be used later
        refreshList:this.onGetServices  //data need to be refreshed after being edited
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
        global.request.post('/api/service/delete',{id:record.id}).then(data=>{
          message.success('Deletion Success')
          this.onGetServices()  //reloading
          window.dispatchEvent(new Event('refreshService'))
        })
      
      }
    })
  }
}
getTableProps=()=>{
  return {
    columns:[
      {
        title:'ServiceID',
        dataIndex:'eventId'
      },
      {
        title:'Service name',
        dataIndex:'eventName'
      },
      {
        title:'Service type',
        dataIndex:'eventType'
      },
      {
        title:'Merchant ID',
        dataIndex:'merchantId'
      },
      {
        title:'Operate',
        render:(record)=>(
          <Space>
          <a onClick={this.onDetail(record)}>Details</a>
           <a onClick={this.onEdit(record)}>Edit</a>
          {/* <a onClick={this.onDelete(record)}>Delete</a>  */}
        </Space>
        )
      }
    ],
    dataSource:this.state.dataSource||[],
    rowKey:'eventId',
    pagination:false
  }
}

onGetEvents=()=>{
  axios.get("https://eventeasynew.azurewebsites.net/api/Event/GetAll")
  .then(response=>{
    this.setState({dataSource:response.data.$values})
  })
  // global.request.get('/api/service/fetching',
  // {email:sessionStorage.getItem('email')}).then(data=>{
  // console.log(data)
  // this.setState({dataSource:data.records})
  // })
  
}
componentDidMount(){ //once render done, make new request
  this.onGetEvents()
}
  render() {
    const {modalForm}=this.props.serviceState
    return (
      //this.props.isLogged == true
      
      <Panel title="Service List">
        <div className='m-operate'>
          <Button type='primary' icon={<PlusOutlined/>} onClick={this.onCreate}>ADD</Button>
            {/** <Button type='primary' icon={<PlusOutlined/>} onClick={this.onCreate()}>ADD</Button> */}
        </div>
        <Card>
          {/**component */}
          <Table {...this.getTableProps()}/>
        </Card>
        {modalForm&&<ModalForm {...modalForm} {...this.props}/>}
      </Panel>
      
    )
  }
}
const mapStateToProps=(store)=>({serviceState:store.service})
const mapDispatchToProps=(dispatch)=>({dispatch})
export default connect(mapStateToProps,mapDispatchToProps)(Service)