import React, { Component } from 'react'
import {Modal,Form,Input, message} from 'antd'
import {Location} from '../../../commons'
import Uploads from './Uploads'

class ModalUser extends Component {
formRef=React.createRef()

layout={
    labelCol:{span:4},
    wrapperCol:{span:20}
}

componentDidMount(){
    this.formRef.current.setFieldsValue(this.props.data)
    this.formRef.current.setFieldsValue({access:5})
    //assign access level 5 to user, 5 means user
}
onSave=(value)=>{
    
    console.log(value)
    if(this.props.title=='New User'){
        global.request.post('/api/user/add',
        {...value,location:value.location.join(',')}).then(
            //location is an array from form, need converted to be string
            data=>{
                message.success('User Insertion Success')
                this.onCancel() //close modal
                //refresh user list
                this.props.refreshList()  //reloading data
                return
            }
        )
       
    }
        global.request.post('/api/user/edit',
        {...value,location:value.location.join(','),id:this.props.data.id}).then(
            //location is an array from form, need converted to be string
            data=>{
                message.success('User Update Success')
                this.onCancel() //close modal
                //refresh user list
                this.props.refreshList()  //reloading data
                return
            }
        )

    
    
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
    const readOnly=this.props.title=='User Details'?true:false
    const {data={}}=this.props
    return (
    <Modal visible width={700} 
        title={this.props.title}
        onOk={()=>this.formRef.current.submit()} 
        onCancel={this.onCancel}
        className={readOnly?'m-readonly-modal':''}
    >
      <Form {...this.layout} onFinish={this.onSave} ref={this.formRef}>
        
        <Form.Item label='Access Level' name='access'>
            {
                this.props.data.access == 5 ? 'Normal User' : (this.props.data.access==3 ? 'Merchant':this.props.access==1?'Admin':'New User')
            }
        </Form.Item>
        
        <Form.Item label='Area' name='location' rules={[{required:true}]}>
            <Location onChange={this.onGeoChange}
                defaultValue={data.location}
            />
        </Form.Item>
       
        <Form.Item label='username' name='username' rules={[{required:true}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='password' name='password' rules={[{required:true}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='email' name='email' rules={[{required:true, type: 'email'}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='phone number' name='phonenumber' rules={[{required:true}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='Profile' name='profile' rules={[{required:true}]}>
           <Uploads onChange={this.onPictureChange} 
           defaultFileList={data.profile?data.profile.split(','):[]}
           />
        </Form.Item>
      </Form>
    </Modal>
    )
  }
}
export default ModalUser