import React, { Component } from 'react'
import {Space} from 'antd'
import './style/index.css'
export default class Header extends Component {
  render() {
    return (
      <div className='m-header'>
        <Space>
            <span>hi, xxx</span>
            <a>Log Out</a>
        </Space>
      </div>
    )
  }
}
