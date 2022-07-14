import React, { Component } from 'react'
import { Cascader } from 'antd'

export default class extends Component{
    constructor(props){
        super(props)
        this.state={options:[]}
    }

    componentDidMount(){
        global.request.get('/api/area/state').then( ({records=[]})=>{
            records.map(item=>item.isLeaf=false)
            this.setState({options:records})
        })
    }

    onRequestCode=(parent)=>{
       
        const isLeaf=String(parent.id).length==2?true:false
        global.request.get(`/api/area/${isLeaf?'city':'postcode'}`,{pid:parent.id}).then(data=>{
            data.records.map(item=>item.isLeaf=isLeaf)
            parent.children=data.records
            this.setState({options:[...this.state.options]})
           
        })
    }

    loadState=(states=[])=>{
        const selected=states[states.length-1]
        this.onRequestCode(selected)
    }
    render(){
        return <Cascader placeholder='State/PostCode/Suburb'
        options={this.state.options}
        loadData={this.loadState}
        onChange={this.props.onChange}  //passing onChange data
        />
    }
}