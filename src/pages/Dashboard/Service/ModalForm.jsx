/*
This file shows a modal for viewing/editing service

Created by Mingke Deng, and Hans Wang
Last Modified: 23/09/2022
*/
import React, { Component } from 'react';
import { Modal, Form, Input, Select, InputNumber, message } from 'antd';
import axios from 'axios';
const { BlockBlobClient, AnonymousCredential } = require('@azure/storage-blob');
//const sasKey = `?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-09-30T11:42:53Z&st=2022-09-03T03:42:53Z&spr=https,http&sig=ZUKmAOkmWjgmj4%2BnEzXOXkYMP%2BRbnOw1HsAnLDFnIuk%3D`
const sasKey = `?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-11-29T19:45:23Z&st=2022-09-19T12:45:23Z&spr=https&sig=yx%2FKdyP71JQtzprvrusOKa2%2BYFkC8FaG2U3PAoEw07w%3D`

const url = 'https://easyevent.blob.core.windows.net'
const container = 'image'


class ModalForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVenue: false
        }
        // this.state={allIcons:Icons,currentIcons:Icons.slice(0,10)}
        //initial display 10 icons as default
    }
    formRef = React.createRef()
    blobUpload = (e) => {

        var blobName = this.buildBlobName(e.target.files[0].name)
        //console.log(blobName)
       

        var login = url + '/' + container + '/' + blobName + '?' + sasKey
        this.formRef.current.setFieldsValue({ imagePath: (url+"/"+container+"/"+blobName) })
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
    onCancel = () => { //user clicks on the cancel button, close modal
        this.props.dispatch({ //passing state to modal through dispatch
            type: 'hide'
        })
    }

    layout = {
        //form layout
        labelCol: { span: 10 },
        wrapperCol: { span: 250 }
    }

    componentDidMount() {
        this.formRef.current.setFieldsValue(this.props.data)  //forminstance
        // this.setState({icons:this.props.data.icons})
    }
    /**
     * make http request and send data to database
     */
    onSave = (values) => {
        console.log(values)
        //checking the title from dispatch is it add or update
        if (this.props.title === 'Add Service') {
            //post a set of data for a new service
            axios.post(`https://eventeasyau.azurewebsites.net/api/services/create/`, values)
                .then(response => {
                    //console.log(response)
                    message.success('Service Add Success'); //tell user success
                    this.onCancel() //close modal
                    this.props.refreshList()  //reloading data
                }).catch(err => {
                    console.log(err)
                })
        }
        else {
            //update selected service
            axios.put(`https://eventeasyau.azurewebsites.net/api/services/update/${this.props.data.servicesId}`, values)
                .then(response => {
                    //console.log(response)
                    message.success('Service Update Success');  //tell user update success
                    this.onCancel() //close modal
                    this.props.refreshList()  //reloading data
                }).catch(err => {
                    console.log(err)
                })
        }

    }

    render() {
        const readOnly = this.props.title === 'Details' ? true : false
        //const isvisable=this.props.title==='Add Service'?false:true

        return (
            <Modal visible width={600} title={this.props.title}
                onCancel={this.onCancel}
                onOk={() => this.formRef.current.submit()}
                className={readOnly ? 'm-readonly-modal' : 'dash-event'}
            >

                <Form {...this.layout} ref={this.formRef} onFinish={this.onSave}
                    fields={
                        //there is the only place to give fields default value in antd
                        [
                            {
                                name: ["merchantId"],
                                value: sessionStorage.getItem("id")
                            },
                            {
                                name: ["introduction"],
                                value: sessionStorage.getItem("username")
                            }, {
                                name: ['status'],
                                value: 0
                            }
                        ]
                    }
                >
                    <Form.Item label="Service Name" name='serviceName'
                        rules={[{ required: true, message: 'Please input your Service Name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Service Type" name='serviceType'
                        onChange={() => { this.formRef.current.getFieldValue("serviceType") === 0 ? this.setState({ isVenue: true }) : this.setState({ isVenue: false }) }}
                        rules={[{ required: true, message: 'Please select your Service type!' }]}>
                        <Select>
                            <Select.Option value={0}>Venue</Select.Option>
                            <Select.Option value={1}>Food</Select.Option>
                            <Select.Option value={2}>Beverage</Select.Option>
                            <Select.Option value={3}>Entertainment,</Select.Option>
                            <Select.Option value={4}>Florist,</Select.Option>
                            <Select.Option value={5}>Photographer,</Select.Option>
                            <Select.Option value={6}>Power,</Select.Option>
                            <Select.Option value={7}>Network,</Select.Option>
                            <Select.Option value={8}>Music,</Select.Option>
                            <Select.Option value={9}>Security,</Select.Option>
                            <Select.Option value={10}>Restroom,</Select.Option>
                            <Select.Option value={11}>CarPark,</Select.Option>
                            <Select.Option value={12}>Waiter,</Select.Option>
                            <Select.Option value={13}>Transport,</Select.Option>
                            <Select.Option value={14}>Taxi,</Select.Option>
                            <Select.Option value={15}>Firework</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Event Type" name='eventType' rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value={0}>Wedding&Engagement</Select.Option>
                            <Select.Option value={1}>Birthday&Private</Select.Option>
                            <Select.Option value={2}>Corporate Functions</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Status" name='status' style={{ display: 'none' }}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Merchant ID" name='merchantId' >
                        <Input disabled={sessionStorage.getItem('access') === 1 ? false : true} />
                    </Form.Item>
                    <Form.Item label="Merchant Name" name='introduction' >
                        <Input disabled={sessionStorage.getItem('access') === 1 ? false : true} />
                    </Form.Item>
                    <Form.Item label="Standing Capacity" name='standing'
                        rules={[{ required: this.state.isVenue, message: 'Please input Standing number' }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Venue Seats" name='seated'
                        rules={[{ required: this.state.isVenue, message: 'Please input Seats number' }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Price" name='price' rules={[{ required: true }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Location" name='serviceLocation'>
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
export default ModalForm
