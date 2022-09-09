import React, { Component } from 'react';
import { Modal,Form,Input,Select,InputNumber,Dropdown,Radio,Space,Pagination, message} from 'antd';
import { Icons } from '../../../commons';
import _ from 'lodash';
import axios from 'axios';
class ModalForm extends Component {

constructor(props){
    super(props);
    this.state={
        isVenue:false
    }
    // this.state={allIcons:Icons,currentIcons:Icons.slice(0,10)}
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
    labelCol:{span:10},
    wrapperCol:{span:250}
}

// onTyping = (e) =>{
//     let {value} = e.target  //event was dispatched
//     value=_.trim(value) //remove space
//     const tempIcons=[] //store the matched Icons

//     if(value){ //non empty
//         Icons.map(item=>{
//             //convert all text lowercase
//             if(_.lowerCase(item.name).indexOf(_.lowerCase(value))!==-1){ //keyword matching
//                 tempIcons.push(item) //push to temp
//             }
//         })
//         this.setState({icons:value,allIcons:tempIcons,currentIcons:tempIcons.slice(0,10)})
//         //update displayed Icons
//         return
//     }
//     this.setState({icons:value,allIcons:Icons,currentIcons:Icons.slice(0,10)})
// }

// onSelected=(e)=>{
//     const {value}=e.target   //get select Icons value
//     this.setState({icons:value}) //passing icons icon value
//     //manually set input
//     this.formRef.current.setFieldsValue({icons:value})  //forminstance
// }
componentDidMount(){
    this.formRef.current.setFieldsValue(this.props.data)  //forminstance
    // this.setState({icons:this.props.data.icons})
}
/**
 * make http request and send data to database
 */
onSave=(values)=>{
    console.log(values)
    
    if(this.props.title=='Add Service')
    {
        axios.post(`https://eventeasyau.azurewebsites.net/api/services/create/`,values)
        .then(response=>{
            console.log(response)
            message.success('Service Add Success');
            this.onCancel() //close modal
            this.props.refreshList()  //reloading data
        }).catch(err=>{
            console.log(err)
        })
    }
    else
    {
       
        axios.put(`https://eventeasyau.azurewebsites.net/api/services/update/${this.props.servicesId}`,values)
        .then(response=>{
            console.log(response)
            message.success('Service Update Success');
            this.onCancel() //close modal
            this.props.refreshList()  //reloading data
        }).catch(err=>{
            console.log(err)
        })
    }

}

render() {
    const readOnly=this.props.title=='Details'?true:false
    const isvisable=this.props.title=='Add Service'?false:true
    
    return (
    <Modal visible width={600} title={this.props.title}
        onCancel={this.onCancel}
        onOk={()=>this.formRef.current.submit()}
        className={readOnly?'m-readonly-modal':'dash-event'}
    >
            
        <Form {...this.layout} ref={this.formRef} onFinish={this.onSave}
                fields={
                [
                    {
                    name: ["merchantId"],
                    value: sessionStorage.getItem("id")
                    },
                    {
                        name: ["merchant"],
                        value: sessionStorage.getItem("username")
                    },
                ]
               }
        >
            <Form.Item label="Service Name" name='serviceName' 
                rules={[{required:true, message: 'Please input your Service Name!'}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Service Type" name='serviceType' 
            onChange={()=>{ this.formRef.current.getFieldValue("serviceType")==0?this.setState({isVenue:true}):this.setState({isVenue:false}) }}
                rules={[{required:true,message: 'Please select your Service type!'}]}>
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
            <Form.Item label="Event Type" name='eventType' rules={[{required:true}]}>
                <Select>
                    <Select.Option value={0}>Wedding&Engagement</Select.Option>
                    <Select.Option value={1}>Birthday&Private</Select.Option>
                    <Select.Option value={2}>Corporate Functions</Select.Option>
                </Select>
            </Form.Item>
            {/* <Form.Item label="Service ID" name={isvisable ? 'servicesId' : '' } style={{display:isvisable?'':'none'}}>
                <Input disabled={true}/>
            </Form.Item> */}
            <Form.Item label="Merchant ID" name='merchantId' >
                <Input disabled={sessionStorage.getItem('access')==1?false:true}/>
            </Form.Item>
            <Form.Item label="Merchant Name" name='introduction' >
                <Input disabled={sessionStorage.getItem('access')==1?false:true}/>
            </Form.Item>
            <Form.Item label="Standing Capacity" name='standing' 
                rules={[{required:this.state.isVenue,message: 'Please input Standing number'}]}>
                <InputNumber/>
            </Form.Item>
            <Form.Item label="Venue Seats" name='seated' 
                rules={[{required:this.state.isVenue,message: 'Please input Seats number'}]}>
                <InputNumber/>
            </Form.Item>
            <Form.Item label="Price" name='price' rules={[{required:true}]}>
                <InputNumber/>
            </Form.Item>
            <Form.Item label="Location" name='location'>
                <Input/>
            </Form.Item>
           
            
            {/**Icons */}
{/* 
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

                    </>}> 
                </Dropdown>
            </Form.Item> */}

        </Form>

    
    </Modal>
    )
  }
}
export default ModalForm
