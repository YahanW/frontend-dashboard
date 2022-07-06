import React, { Component } from 'react'
import { Modal,Form,Input,Select,InputNumber,Dropdown,Radio,Space,Pagination} from 'antd'
import { Icons } from '../../commons'
import _ from 'lodash'
import axios from 'axios'

class ModalForm extends Component {

constructor(props){
    super(props)
    this.state={allIcons:Icons,currentIcons:Icons.slice(0,10)}
    //initial display 10 icons as default
}
formRef=React.createRef()

onCancel=()=>{ //user clicks on the cancel button, close modal
    this.props.dispatch({ //passing state to modal through dispatch
        type:'hide'
    })
}

layout={ 
    //form layout
    labelCol:{span:6},
    wrapperCol:{span:20}
}

onTyping = (e) =>{
    let {value} = e.target  //event was dispatched
    value=_.trim(value) //remove space
    const tempIcons=[] //store the matched Icons

    if(value){ //non empty
        Icons.map(item=>{
            //convert all text lowercase
            if(_.lowerCase(item.name).indexOf(_.lowerCase(value))!==-1){ //keyword matching
                tempIcons.push(item) //push to temp
            }
        })
        this.setState({icons:value,allIcons:tempIcons,currentIcons:tempIcons.slice(0,10)})
        //update displayed Icons
        return
    }
    this.setState({icons:value,allIcons:Icons,currentIcons:Icons.slice(0,10)})
}

onSelected=(e)=>{
    const {value}=e.target   //get select Icons value
    //console.log(e.target)
    this.setState({icons:value}) //passing icons icon value
    //manually set input
    this.formRef.current.setFieldsValue({icons:value})  //forminstance
    
}
/**
 * make http request and send data to database
 */
onSave=(values)=>{
    console.log(values)
    axios.post('/api/services/add',values).then((data)=>{
        //console.log(data)
        //post form to backend
        this.onCancel() //close modal
        this.props.refreshList()  //reloading data
    })
}


render() {
    return (
    <Modal visible width={600} title={this.props.title}
        onCancel={this.onCancel}
        onOk={()=>this.formRef.current.submit()}>
    
        <Form {...this.layout} ref={this.formRef} onFinish={this.onSave}>
            <Form.Item label="Service Name" name='sname' 
                rules={[{required:true, message: 'Please input your Service Name!'}]}>
                <Input/>
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
            {/**Icons */}

            <Form.Item label='Icons' name='icons' rules={[{required:true,message: 'Please select your Icon!'}]}> 
                <Dropdown 
                    trigger={['click']} 
                    overlayStyle={{background:'#fff',padding:10}}
                    overlay={ 
                    <> 
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
                            <Pagination showSizeChanger={false} size="small" total={this.state.allIcons.length}
                            onChange={(page,pageSize)=>this.setState({
                                currentIcons:this.state.allIcons.slice(pageSize*(page-1),pageSize*page)})}
                            />
                        </div>

                    </>}
  /**Dropdown*/> 
                    <Input prefix={
                        React.createElement((_.find(this.state.allIcons,(item)=>
                            item.name==this.state.icons)||{}).renderDf||'something')} 
                        onChange={this.onTyping} 
                        value={this.state.icons}
                      />
                </Dropdown>
            </Form.Item>

        </Form>

    
    </Modal>
    )
  }
}
export default ModalForm
