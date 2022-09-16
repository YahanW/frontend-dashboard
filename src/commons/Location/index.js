import React, { Component } from 'react'
import { Cascader } from 'antd'
import _ from 'lodash'
export default class extends Component{
    constructor(props){
        super(props)
        this.state={options:[],defaultValue:props.defaultValue}
    }

    componentDidMount(){
        const {defaultValue} = this.state
        global.request.get('/api/area/state').then( ({records=[]})=>{
            records.map(item=>item.isLeaf=false)
            this.setState({options:records})
            if(defaultValue&&defaultValue.length){
                //fetching state id by name
               this.onInit(records)
            }
        })
    }
    /**
     * records: fetching target
     * index: location layer index
     */
    onInit=(records,index=0)=>{
        const item=_.find(records,(item)=>item.value==this.state.defaultValue[index]) || {}
        if(index==2) return // 2 means city but there is no lower location level than city
        this.onRequestCode(item).then(data=>{
            this.onInit(data,index+1)
        })  
    }
    onRequestCode=(parent)=>{
       
        const isLeaf=String(parent.id).length==2?true:false
        return global.request.get(`/api/area/${isLeaf?'city':'postcode'}`,{pid:parent.id}).then(data=>{
            data.records.map(item=>item.isLeaf=isLeaf)
            parent.children=data.records
            this.setState({options:[...this.state.options]})
            return data.records
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
        defaultValue={this.state.defaultValue}
        />
    }
}