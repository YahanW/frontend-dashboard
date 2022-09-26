/*
This file shows the modal for leveling up a user

Created by Mingke Deng, and Hans Wang
Last Modified: 23/09/2022
*/
import React from "react";
import { Modal,Button,message } from "antd";
import { AlignCenterOutlined } from "@ant-design/icons";
import axios from "axios";

export default class extends React.Component{

    onCancel=()=>{
        this.props.dispatch({
            type:'hideLevelModal'
        })
    }
   
    toMerchant=()=>{
        axios.put(`https://eventeasyau.azurewebsites.net/api/User/Update/`,
        {accessNumber:3,userId:this.props.data.userId})
        .then(response=>{
            console.log(response)
            message.success('User Leverage Success');
            this.props.refreshList();
            this.onCancel();
            return
        }).catch(err=>{
            console.log(err);
        })
    }
    toAdmin=()=>{
        axios.put(`https://eventeasyau.azurewebsites.net/api/User/Update/`,
        {accessNumber:1,userId:this.props.data.userId})
        .then(response=>{
            console.log(response)
            message.success('User Leverage Success');
            this.props.refreshList();
            this.onCancel();
            return
        }).catch(err=>{
            console.log(err);
        })
    }
    render(){
        //const {data={}}=this.props
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
