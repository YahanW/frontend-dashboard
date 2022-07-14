import React, { Component } from 'react'
import { Upload ,Space, message,Modal} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import _ from 'lodash'

export default class Uploads extends Component {
  constructor(props){
    super(props)
    this.state={
        defaultFileList:this.props.defaultFileList
    }
    this.fileUrlList=[]
  }
  render() {
    const uploadProps = {
        action:'/api/upload', //storage location
        listType:'picture-card',   //layout style 
        maxCount: this.props.maxCount||1, //the max upload number may be different, default 1
        defaultFileList:this.state.defaultFileList, //all file uploaded
    

        onChange:(info)=>{
            const {file,fileList}=info; 
            //get file storage path, the files may be multiple so fileList
            const {response}=file;
            if(file.status=='done') //checking if the file has been uploaded
            {
                this.fileUrlList=[] //clear list
                fileList.map(item=>{  //save all file path
                    this.fileUrlList.push( item.url || item.response.file.url)
                })
                this.props.onChange&&this.props.onChange(this.fileUrlList.join(', '))
                //return paths by function call from props

            }else if(file.status=='error'){ //upload wasn't successful
                message.error("upload failed")
            }
        },
        onRemove:(file)=>{
            _.remove(this.fileUrlList,(item)=>(file.url||file.response.file.url)==item)  //searching for the exact file
            this.props.onChange&&this.props.onChange(this.fileUrlList.join(', ')) //refresh list
        },
        onPreview:(file)=>{
            this.setState({preModal:{url:file.url||file.response.file.url}})
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
            <img src={this.state.preModal.url} 
            style={{
                justifyContent:'center',
                width:'450px',
                height:'450px'
            }}
            
            />
        </Modal>
      }
      </>
    )
  }
}
