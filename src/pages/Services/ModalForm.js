import React, { Component } from 'react'
import { Modal } from 'antd'

class ModalForm extends Component {
  render() {
    return (
    <Modal visible width={600} title={this.props.title}>
        Form
    </Modal>
    )
  }
}
export default ModalForm