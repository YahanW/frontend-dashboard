import React, { Component } from 'react'
import { Modal } from 'antd'

class ModalForm extends Component {

onCancel=()=>{
    //close modal
    this.props.dispatch({ //passing state to modal through dispatch
        type:'hide'
    })
}
  render() {
    return (
    <Modal visible width={600} title={this.props.title}
    onCancel={this.onCancel}
    >
        Form
    </Modal>
    )
  }
}
export default ModalForm