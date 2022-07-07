import React, { Component } from 'react'
import { Button, Card, Table, Space } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import { Panel } from '../../commons'
import { connect } from 'react-redux'
import ModalForm from './ModalForm'


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
      refreshList:this.onGetServices  
      //passing service list so as to be used later
    }
  })
}

onDetail=(record)=>{
  return ()=>{
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
getTableProps=()=>{
  return {
    columns:[
      {
        title:'Service ID',
        dataIndex:'id'
      },
      {
        title:'Service name',
        dataIndex:'sname'
      },
      {
        title:'Service type',
        dataIndex:'category'
      },
      {
        title:'Merchant',
        dataIndex:'mname'
      },
      {
        title:'Operate',
        render:(record)=>(
          <Space>
          <a onClick={this.onDetail(record)}>details</a>
          <a>edit</a>
          <a>delete</a>
        </Space>
        )
      }
    ],dataSource:this.state.dataSource||[],
    rowKey:'id',
    pagination:false
  }
}
onGetServices=()=>{

  global.request.get('/api/service/list').then(data=>{
    console.log(data)
    this.setState({dataSource:data.records})
  })
  
}
componentDidMount(){ //once render done, make new request
  this.onGetServices()
}
  render() {
    const {modalForm}=this.props.serviceState
    return <Panel title="Service List">
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
    
  }
}
const mapStateToProps=(store)=>({serviceState:store.service})
const mapDispatchToProps=(dispatch)=>({dispatch})
export default connect(mapStateToProps,mapDispatchToProps)(Service)