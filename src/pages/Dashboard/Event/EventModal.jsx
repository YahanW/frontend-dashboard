import React, { Component } from 'react';
import {Modal,Form,Input,InputNumber} from 'antd';
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
            <Form.Item name="customerId" label="Customer ID">
                <Input/>
            </Form.Item>
        </Form>
      </Modal>
    )
  }
}
