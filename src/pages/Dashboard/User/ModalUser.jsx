import React, { Component } from 'react'
import {Modal,Form,Input} from 'antd'
import {Location} from '../../../commons'
import Uploads from './Uploads'

class ModalUser extends Component {
formRef=React.createRef()

layout={
    labelCol:{span:4},
    wrapperCol:{span:20}
}
onSave=(value)=>{
    console.log(value)
}
onGeoChange=(value)=>{
    this.formRef.current.setFieldsValue({location:value})
    console.log(value)
}
onCancel=()=>{
    this.props.dispatch({
        type:'hide'
    })
}
onPictureChange=(value)=>{
    console.log(value)
    this.formRef.current.setFieldsValue({profile:value})
}

render() {
    return (
    <Modal visible width={700} 
        title={this.props.title}
        onOk={()=>this.formRef.current.submit()} 
        onCancel={this.onCancel}
    >
      <Form {...this.layout} onFinish={this.onSave} ref={this.formRef}>
        {/*<Form.Item label='Area' name='location' rules={[{required:true}]}>
            <Location onChange={this.onGeoChange}/>
    </Form.Item>*/}
        <Form.Item label='Profile' name='profile' rules={[{required:true}]}>
           <Uploads onChange={this.onPictureChange} />
        </Form.Item>
        <Form.Item label='username' name='username' rules={[{required:true}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='password' name='password' rules={[{required:true}]}>
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