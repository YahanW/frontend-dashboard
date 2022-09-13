import React, { Component } from 'react';
import { Button, Card, Table, Space, Modal, message, Switch } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import { Panel } from '../../../commons';
import { connect } from 'react-redux';
import ModalForm from './ModalForm';
import axios from 'axios';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import {Rings} from 'react-loader-spinner';

class Service extends Component {
  constructor(props){
  super(props)
  this.state = {
    dataSource:[],
  }
}
LoadingIndicator = () => {
	const { promiseInProgress } = usePromiseTracker();
	return (
		promiseInProgress &&<div
		style={{marginLeft:"14vw"}}>
			<Rings color="#00BFFF" height={80} width={80} />
		</div>
		
    	
	);}


  componentDidMount() {
      this.onGetServices();  //fetching users once upon the element are rendered
  }
  onGetServices = () => { //ok
    
    // if admin then display all services
        if(sessionStorage.getItem("access") == 1) {
          trackPromise(
            axios.get("https://eventeasyau.azurewebsites.net/api/services/getenableservices")
          .then(data => {
            console.log(data.data.$values)
            this.setState({ dataSource: data.data.$values })
          }))
        }
        // if merchant then show only their services (getservicesbymerchant)
        // first get service by merchant ID
        // Show Event dashboard where eventService.serviceID == Merchant.serviceId 
        // then traverse serviceType: if serviceType==0 then (approve/reject)
    
        else if (sessionStorage.getItem("access") == 3) {
          trackPromise(
             axios.get(`https://eventeasyau.azurewebsites.net/api/services/getservicesbymerchant/${sessionStorage.getItem("id")}`)
            .then(data => {
              console.log(data)
              this.setState({ dataSource: data.data.$values })
            }))
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
        title:'EditService',
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
      content:'Are you sure to delete this Service?',
      onOk:()=>
      {
        axios.delete(`https://eventeasyau.azurewebsites.net/api/Services/Disableservices/${record.servicesId}`)
        .then(data=>{
          console.log(data)
          message.success('Deletion Success')
          this.onGetServices()  //reloading
        }).catch(err=>{
          console.log(err)
          message.error("Deletion Failed")
        })
      
      }
    })
  }
}

getTableProps=()=>{
  return {
    pagination:{
      pageSize:10,
      showTotal:()=>`total ${this.state.dataSource.length} Service records`
    },
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
        title:'Event Type',
        dataIndex:'eventType',
        render:(record)=>{
          switch(record){
            case 0:return "Wedding Engagement"; break;
            case 1:return "Birthday&Private"; break;
            case 2:return "Corporate Functions"; break;
            default: break;
          }
        }
      },
      {
        title:'Capacity',
        render: (record) => {
          return Math.max(record.standing, record.seated);
        } 
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
          <a onClick={this.onDelete(record)}>Delete</a> 
        </Space>
        )
      }
    ],
    dataSource:this.state.dataSource||[],
    rowKey:'servicetId',
    pagination:true
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
          <this.LoadingIndicator/>
        </Card>
        {modalForm&&<ModalForm {...modalForm} {...this.props}/>}
      </Panel>
      
    )
  }
}
const mapStateToProps=(store)=>({serviceState:store.service})
const mapDispatchToProps=(dispatch)=>({dispatch})
export default connect(mapStateToProps,mapDispatchToProps)(Service)