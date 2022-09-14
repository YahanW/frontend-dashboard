import React, { Component } from 'react';
import {Modal,Form,Input,InputNumber, Select,message} from 'antd';
import axios from 'axios';

export default class EventModal extends Component {
    formRef=React.createRef()
    layout={
        labelCol:{span:8},
        wrapperCol:{span:20}
    }
    componentDidMount(){
        this.formRef.current.setFieldsValue(this.props.data)
    }
    onCancel=()=>{
        this.props.dispatch({
            type:'hide'
        })
    }
    onSave=(values)=>{
        console.log(values)
        axios.put(`https://eventeasyau.azurewebsites.net/api/event/update/${this.props.data.eventId}`,values)
        .then(response=>{
            console.log(response)
            this.onCancel(); //close modal
            message.success('Event updated Successfully');
            this.props.refreshList();
            
           
        }).catch(err=>{
            console.log(err)
        })
    }
  render() {
    const readOnly=this.props.title=='Event Details'?true:false
    return (
       
      <Modal visible width={700} title={this.props.title} 
      onOk={()=>this.formRef.current.submit()} onCancel={this.onCancel}
      className={readOnly?'m-readonly-modal':''}
      >
        <Form {...this.layout} onFinish={this.onSave} ref={this.formRef}>
            <Form.Item name="eventName" label="Event Name">
                <Input/>
            </Form.Item>
            <Form.Item name="guest" label="Guest Number">
                <InputNumber/>
            </Form.Item>
            <Form.Item name="bookingStatus" label="Status">
                <Select>
                    <Select.Option value={0} disabled={sessionStorage.getItem('access')==1?false:true}>Created</Select.Option>
                    <Select.Option value={1} disabled={sessionStorage.getItem('access')==1?false:true}>Waiting</Select.Option>
                    <Select.Option value={2} >Accepted</Select.Option>
                    <Select.Option value={3} >Rejected</Select.Option>
                    <Select.Option value={4} disabled={sessionStorage.getItem('access')==1?false:true}>Cancelled</Select.Option>
                    <Select.Option value={5} disabled={sessionStorage.getItem('access')==1?false:true}>AwaitPayment</Select.Option>
                    <Select.Option value={6} disabled={sessionStorage.getItem('access')==1?false:true}>Paid</Select.Option>
                    <Select.Option value={7} disabled={sessionStorage.getItem('access')==1?false:true}>Completed</Select.Option>
                   
                </Select>
            </Form.Item>
            <Form.Item name="customerId" label="Customer ID">
                <Input disabled={sessionStorage.getItem('access')===1?false:true}/>
            </Form.Item>
           
        </Form>
      </Modal>
    )
  }
}
