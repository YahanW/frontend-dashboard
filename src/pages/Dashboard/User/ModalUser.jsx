/*
This file shows a modal for viewing/editing user

Created by Mingke Deng, and Hans Wang
Last Modified: 23/09/2022
*/
import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import axios from 'axios'
const { BlockBlobClient, AnonymousCredential } = require('@azure/storage-blob');
const sasKey = `?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-11-29T19:45:23Z&st=2022-09-19T12:45:23Z&spr=https&sig=yx%2FKdyP71JQtzprvrusOKa2%2BYFkC8FaG2U3PAoEw07w%3D`
const url = 'https://easyevent.blob.core.windows.net'
const container = 'image'

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: "",
        }
    }
    formRef = React.createRef()
    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 20 }
    }

    blobUpload = (e) => {

        var blobName = this.buildBlobName(e.target.files[0].name)
        //console.log(blobName)
        this.formRef.current.setFieldsValue({ imagePath: blobName })

        var login = url + '/' + container + '/' + blobName + '?' + sasKey
        var blockBlobClient = new BlockBlobClient(login, new AnonymousCredential())
        blockBlobClient.uploadBrowserData(e.target.files[0]).then(
            response => {
                console.log(response)
            }
        )
    }

    buildBlobName = (name) => {
        var filename = name.substring(0, name.lastIndexOf('.'))
        var ext = name.substring(name.lastIndexOf('.'))
        return filename + '_' + Math.random().toString(16).slice(2) + ext

    }

    componentDidMount() {
        this.formRef.current.setFieldsValue(this.props.data)
        this.formRef.current.setFieldsValue({ accessNumber: 5 })
        //assign access level 5 to user, 5 means user
    }
    onSave = (value) => {
        console.log(value)
        if (this.props.title == 'New User') {
            // console.log(value)
            axios.post("https://eventeasyau.azurewebsites.net/api/user/create", value)
                .then(response => {
                    console.log(response);
                    message.success('User Update Success');
                    this.props.refreshList();
                    this.onCancel();
                    return
                }).catch(err => {
                    console.log(err);
                })
        }
        else {
            axios.put(`https://eventeasyau.azurewebsites.net/api/User/Update/`, value)
                .then(response => {
                    console.log(response)
                    message.success('User Update Success');
                    this.props.refreshList();
                    this.onCancel();
                    return
                }).catch(err => {
                    console.log(err);
                })
        }

    }

    onCancel = () => {
        this.props.dispatch({
            type: 'hide'
        })
    }

    render() {
        const readOnly = this.props.title == 'User Details' ? true : false
        const { data = {} } = this.props

        return (
            <Modal visible width={700}
                title={this.props.title}
                onOk={() => this.formRef.current.submit()}
                onCancel={this.onCancel}
                className={readOnly ? 'm-readonly-modal' : ''}
            >
                <Form {...this.layout} onFinish={this.onSave} ref={this.formRef}>

                    <Form.Item label='Access Level' name='accessNumber'>
                        <p>{data.accessNumber == 3 ? 'Merchant' :
                            (data.accessNumber == 5 ? 'Customer' :
                                data.accessNumber == 1 ? 'Admin' : 'User')}
                        </p>
                    </Form.Item>

                    <Form.Item label='User ID' name='userId' style={{ display: this.props.title == 'New User' ? 'none' : '' }} >
                        <Input disabled={true} />
                    </Form.Item>

                    <Form.Item label='username' name='userName' rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='password' name='password' rules={[{ required: false }]}>
                        <Input />

                    </Form.Item>
                    <Form.Item>
                        <p style={{ marginLeft: '8vw', display: readOnly ? '' : 'none' }}>For security reason, the password has been hashed.</p>
                    </Form.Item>
                    <Form.Item label='email' name='email' rules={[{ required: false, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='phone number' name='phoneNumber' rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="imagePath" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>
                    <input type="file" onChange={e => (this.blobUpload(e))} />

                </Form>
            </Modal>
        )
    }
}
export default ModalUser