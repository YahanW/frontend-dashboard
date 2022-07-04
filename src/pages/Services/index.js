import React, { Component } from 'react'
import { Button, Card } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import { Panel } from '../../commons'
export default class Service extends Component {
  render() {
    return <Panel title="Service List">
                <div className='m-operate'>
                    <Button type='primary' icon={<PlusOutlined/>}>ADD</Button>
                </div>
            <Card>
                {/**component */}
            </Card>
           </Panel>
    
  }
}
