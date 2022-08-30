import React, { Component } from 'react'
import {Modal,Form,Input, message,Radio} from 'antd'
import {Location} from '../../../commons'
import Uploads from './Uploads'
import axios from 'axios'

class ModalUser extends Component {
formRef=React.createRef()

layout={
    labelCol:{span:8},
    wrapperCol:{span:20}
}

componentDidMount(){
    this.formRef.current.setFieldsValue(this.props.data)
    this.formRef.current.setFieldsValue({accessNumber:5})
    //assign access level 5 to user, 5 means user
}
onSave=(value)=>{
    console.log(value)
    if(this.props.title=='New User')
    {
        // console.log(value)
        axios.post("https://eventeasyau.azurewebsites.net/api/user/create",value)
        .then(response=>{
            console.log(response);
            message.success('User Update Success');
            this.props.refreshList();
            this.onCancel();
            return
        }).catch(err=>{
            console.log(err);
        })
    }
    else
    {
        axios.put(`https://eventeasyau.azurewebsites.net/api/User/Update/`,value)
        .then(response=>{
            console.log(response)
            message.success('User Update Success');
            this.props.refreshList();
            this.onCancel();
            return
        }).catch(err=>{
            console.log(err);
        })
    }

}

// onGeoChange=(value)=>{
//     this.formRef.current.setFieldsValue({location:value})
//     console.log(value)
// }
onCancel=()=>{
    this.props.dispatch({
        type:'hide'
    })
}
// onPictureChange=(value)=>{
//     console.log(value)
//     this.formRef.current.setFieldsValue({profile:value})
// }

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
        
        <Form.Item label='Access Level' name='accessNumber'>
            <p>{data.accessNumber==3?'Merchant':
                    (data.accessNumber==5?'Customer':
                        data.accessNumber==1?'Admin':'User')}
            </p>
        </Form.Item>
        {/* <Form.Item label='Area' name='location' rules={[{required:true}]}>
            <Location onChange={this.onGeoChange}
                defaultValue={data.location}
            />
        </Form.Item> */}
        <Form.Item label='User ID' name='userId' style={{display:this.props.title=='New User'?'none':''}} >
            <Input disabled={true}/>
        </Form.Item>
        
        <Form.Item label='username' name='userName' rules={[{required:false}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='password' name='password' rules={[{required:false}]}>
            <Input/>
           
        </Form.Item>
        <Form.Item>
            <p style={{marginLeft:'8vw',display:readOnly?'':'none'}}>For security reason, the password has been hashed.</p>
        </Form.Item>
        <Form.Item label='email' name='email' rules={[{required:false, type: 'email'}]}>
            <Input/>
        </Form.Item>
        <Form.Item label='phone number' name='phoneNumber' rules={[{required:true}]}>
            <Input/>
        </Form.Item>
        {/* <Form.Item label='Profile' name='profile' rules={[{required:true}]}>
           <Uploads onChange={this.onPictureChange} 
           defaultFileList={data.profile?data.profile.split(','):[]}
           />
        </Form.Item> */}
      </Form>
    </Modal>
    )
  }
}
export default ModalUser