import React, { Component } from 'react';
import { Button, Card, Table, Space, Modal, message, Switch } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import { Panel } from '../../../commons';
import { connect } from 'react-redux';
import ModalForm from './ModalForm';
import axios from 'axios';

class Service extends Component {
  constructor(props){
  super(props)
  this.state = {
    dataSource:[],
  }
}


  componentDidMount() {
      this.onGetServices();  //fetching users once upon the element are rendered
  }
  onGetServices = () => { //ok
    
    // if admin then display all services
        if(sessionStorage.getItem("access") == 1) {
        axios.get("https://eventeasyau.azurewebsites.net/api/services/getallservices")
          .then(data => {
            console.log(data.data.$values)
            this.setState({ dataSource: data.data.$values })
          })
        }
        // if merchant then show only their services
        else if (sessionStorage.getItem("access") == 3) {
          axios.get(`https://eventeasyau.azurewebsites.net/api/services/getservicesbymerchant/${sessionStorage.getItem("id")}`)
            .then(data => {
              console.log(data)
              this.setState({ dataSource: data.data.$values })
            })
        }
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
        dataIndex:'servicesId'
      },
      {
        title:'Service name',
        dataIndex:'serviceName'
      },
      {
        title:'Service type',
        dataIndex:'serviceType',
        render: (record) => {
          switch (record) {
            case 0:
              return "Venue"; break;
            case 1:
              return "Food";  break;
            case 2:
              return "Beverage"; break;
            case 3: return "Entertainment";break;
            case 4: return "Florist";break;
            case 5: return "Photographer";break;
            case 6: return "Power";break;
            case 7: return "Network";break;
            case 8: return "Music";break;
            case 9: return "Security";break;
            case 10: return "Restroom"; break;
            case 11:return "CarPark";break;
            case 12:return "Waiter";break;
            case 13:return "Transport";break;
            case 14:return "Taxi"; break;
            case 15:return "Firework"; break;
            default:
              break;
          }

        }
      },
      {
        title:'Estimating Price',
        dataIndex:'price'
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
    rowKey:'servicetId',
    pagination:false
  }
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