import React, { Component } from 'react'
import { Button, Card, Table, Space } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import { Panel } from '../../commons'
import { connect } from 'react-redux'
import ModalForm from './ModalForm'


class Service extends Component {
constructor(props){
  super(props)
  this.state={dataSource:[
    {sid:'1',category:'corporate function',merchant:'Business Events Tasmania',name:'Hotel Grand Chancellor Hobart'},
    {sid:'2',category:'wedding', merchant:'Weddings Tasmania Magazine',name:'ISLE WEDDINGS'},
    {sid:'3',category:'private&birthday',merchant:'Private Dining',name:'Mures Upper Deck'},
   
]}
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

getTableProps=()=>{
  return {
    columns:[
      {
        title:'Service ID',
        dataIndex:'sid'
      },
      {
        title:'Service name',
        dataIndex:'name'
      },
      {
        title:'Service type',
        dataIndex:'category'
      },
      {
        title:'Merchant',
        dataIndex:'merchant'
      },
      {
        title:'Operate',
        render:(record)=>(
          <Space>
          <a>details</a>
          <a>edit</a>
          <a>delete</a>
          <a>create</a>
        </Space>
        )
      }
    ],dataSource:this.state.dataSource||[],
    rowKey:'id',
    pagination:false
  }
}

onGetServices=()=>{

  global.Request.get('/api/services/list').then(data=>{
    console.log(data)
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