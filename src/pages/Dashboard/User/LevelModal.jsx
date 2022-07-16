import React from "react";
import { Modal,Button,message } from "antd";
import { AlignCenterOutlined } from "@ant-design/icons";
export default class extends React.Component{
    constructor(props){
        super(props)
        this.state={dataSource:[]}
    }
    componentDidMount(){
        
        global.request.get('/api/user/all').then(data=>{
            this.setState({dataSource:data.records})
        })
    }
    onCancel=()=>{
        this.props.dispatch({
            type:'hideLevelModal'
        })
    }
    onSave=()=>{
        
    }
    toMerchant=()=>{
        global.request.post('/api/user/UpMerchant',
        {...this.props.data,id:this.props.data.id}).then(
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
    toAdmin=()=>{
        global.request.post('/api/user/UpAdmin',
        {...this.props.data,id:this.props.data.id}).then(
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
    render(){
        const {data={}}=this.props
        return (
        <Modal 
            visible 
            width={600} 
            title={this.props.title}
            onCancel={this.onCancel}
            onOk={this.onSave}
            
        >
            <Button type="primary" onClick={this.toAdmin}>Become Admin</Button>
            
            <Button type="primary" onClick={this.toMerchant}>Become Merchant</Button>
        </Modal>)
    }
}
