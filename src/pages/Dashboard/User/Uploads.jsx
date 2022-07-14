import React, { Component } from 'react'
import { Upload ,Space, message,Modal} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import _ from 'lodash'

export default class Uploads extends Component {
  constructor(props){
    super(props)
    this.state={
        defaultFileList:this.props.defaultFileList ||
        [{uid:'1',url:''}]
    }
    this.fileUrlList=[]
  }
  render() {
    const uploadProps = {
        action:'/api/upload', //storage location
        listType:'picture-card',
        maxCount:this.props.maxCount||1,
        defaultFileList:this.state.defaultFileList,
        onChange:(info)=>{
            const {file,fileList}=info;
            const {response}=file;
            if(file.statue=='done'){
                this.fileUrlList=[] //clear list
                //save all file path
                fileList.map(item=>{
                    this.fileUrlList.push(item.url||item.response.file.url)
                })
                this.props.onChange&&this.props.onChange(this.fileUrlList.join(', '))
            }else if(file.status=='error'){
                message.error("upload failed")
            }
        },
        onRemove:(file)=>{
            _.remove(this.fileUrlList,(item)=>(file.url||file.response.url)==item)
            this.props.onChange&&this.props.onChange(this.fileUrlList.join(', ')) //refresh list
        },
        onPreview:(file)=>{
            this.setState({preModal:{url:file.url||file.response.url}})
        }
    }

    return (
      <>
      <Upload {...uploadProps}>
        <Space direction='vertical'>
            <PlusOutlined/>
            <div style={{margin:8}}>Upload</div>
        </Space>
      </Upload>
      {
        this.state.preModal
        &&
        <Modal 
            title="preview" 
            onCancel={()=>this.setState({preModal:null})}
            footer={null}
            visible
        >
            <img src={this.state.preModal.url} stylele={{width:'100%',height:'500px'}}/>
        </Modal>
      }
      </>
    )
  }
}
