import React from "react";
import { Modal,Button } from "antd";
import { AlignCenterOutlined } from "@ant-design/icons";
export default class extends React.Component{

    onCancel=()=>{
        this.props.dispatch({
            type:'hideLevelModal'
        })
    }
    onSave=()=>{
        
    }

    render(){
        return (
        <Modal 
            visible 
            width={600} 
            title={this.props.title}
            onCancel={this.onCancel}
            onOk={this.onSave}
            
        >
            <Button type="primary">Become Admin</Button>
            
            <Button type="primary">Become Merchant</Button>
        </Modal>)
    }
}
