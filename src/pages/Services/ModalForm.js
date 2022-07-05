import React, { Component } from 'react'
import { Modal,Form,Input,Select,InputNumber,Dropdown,Radio,Space,Pagination} from 'antd'
import {Icons} from '../../commons'
import _ from 'lodash'

class ModalForm extends Component {

constructor(props){
    super(props)
    this.state={allIcons:Icons,currentIcons:Icons.slice(0,10)}
}

formRef=React.createRef()

onCancel=()=>{
    //close modal
    this.props.dispatch({ //passing state to modal through dispatch
        type:'hide'
    })
    
}

onTyping = (e) =>{
    let {value} = e.target
    value=_.trim(value) //remove space
    const tempIcons=[] //store the matched Icons

    if(value){ //non empty
        Icons.map(item=>{
            //convert all text lowercase
            if(_.lowerCase(item.name).indexOf(_.lowerCase(value))!==-1){ //keyword matching
                tempIcons.push(item) //push to temp
            }
        })
        this.setState({icon:value,allIcons:tempIcons,currentIcons:tempIcons.slice(0,10)})
        //update displayed Icons
        return
    }
    this.setState({icon:value,allIcons:Icons,currentIcons:Icons.slice(0,10)})
}
onSave=(values)=>{
    console.log(values)
}

onSelected=(e)=>{
    //get select Icons value
    const {value}=e.target
    this.setState({icon:value})
    //manually set input
    this.formRef.current.setFieldsValue({icon:value})
    
}


layout={
    labelCol:{span:6},
    wrapperCol:{span:20}
}
  render() {
    return (
    <Modal visible width={600} title={this.props.title}
        onCancel={this.onCancel}
        onOk={()=>this.formRef.current.submit()}
    >
        <Form {...this.layout} ref={this.formRef} onFinish={this.onSave}>
            <Form.Item label="Access Level">
                {'Merchant'}
            </Form.Item>
            <Form.Item label="Service Name" name='sname' 
                rules={[{required:true, message: 'Please input your Service Name!'}]}>
                <Input/>
            </Form.Item>

            <Form.Item label="Icon" name='Icons' rules={[{required:true,message: 'Please select your Icon!'}]}>
               <Dropdown trigger={['click']} 
                overlayStyle={{background:'#fff',padding:10}}
                overlay={<>
                    <Radio.Group onChange={this.onSelected}>
                        <Space direction='vertical'>
                            {this.state.currentIcons.map(item=>{
                                return <Radio value={item.name}>
                                    {React.createElement(item.renderDf)}
                                    <span style={{margin:5}}>{item.name}</span>
                                </Radio>
                            })}
                        </Space>

                    </Radio.Group>
                    <div style={{textAlign:'right',padding:10}}>
                        <Pagination showSizeChanger={false} size="small" 
                        total={this.state.allIcons.length}
                        onChange={(page,pageSize)=>this.setState({
                            currentIcons:this.state.allIcons.slice(pageSize*(page-1),pageSize*page)
                        })}
                    />
                </div>
                </>
                }> {/*The end of dropdown*/}
                    <Input prefix={React.createElement(
                        (_.find(this.state.allIcons,(item)=>
                            item.name==this.state.Icons)||{}).renderDf||'span'
                        )} onChange={this.onTyping} value={this.state.icon}/>

               </Dropdown>
            </Form.Item>

            <Form.Item label="Merchant Name" name='mname' 
                rules={[{required:true,message: 'Please input your Merchant Name!'}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Service Type" name='category' 
                rules={[{required:true,message: 'Please select your Service type!'}]}>
                <Select>
                    <Select.Option value='1'>corporate function</Select.Option>
                    <Select.Option value='2'>wedding</Select.Option>
                    <Select.Option value='3'>private birthday</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Capacity 1-100" name='capacity' rules={[{required:true}]}>
                <InputNumber min={1} max={100} defaultValue={0}/>
            </Form.Item>
        </Form>
    </Modal>
    )
  }
}
export default ModalForm
