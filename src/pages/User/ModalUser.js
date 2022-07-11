import React, { Component } from 'react'
import {Modal,Form,Input} from 'antd'

class ModalUser extends Component {
formRef=React.createRef()

layout={
    labelCol:{span:4},
    wrapperCol:{span:20}
}
onSave=(values)=>{
    console.log(values)
}
onCancel=()=>{
    this.props.dispatch({
        type:'hide'
    })
}
  render() {
    return (<Modal visible width={700} title={this.props.title}
    onOk={()=>this.formRef.current.submit()} onCancel={this.onCancel}>
      <Form {...this.layout} onFinish={this.onSave} ref={this.formRef}>
        <Form.Item label='firstname' name='firstname' rules={[{required:true}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='lastname' name='lastname' rules={[{required:true}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='username' name='username' rules={[{required:true}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='passwprd' name='password' rules={[{required:true}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='email' name='email' rules={[{required:true}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='phone number' name='phonenumber' rules={[{required:true}]}>
            <Input/>
        </Form.Item>
      </Form>
    </Modal>
    )
  }
}
export default ModalUser