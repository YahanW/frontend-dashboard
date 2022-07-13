import React, { Component } from 'react'
import { Cascader } from 'antd'
import axios from 'axios'
export default class extends Component{
    constructor(props){
        super(props)
        this.state={options:[]}
    }

    componentDidMount(){
        global.request.get('/api/area/state').then( ({records=[]})=>{
            records.map(item=>item.isLeaf=false)
            this.setState({options:records})
            console.log("componentDidMount")
            console.log(records)
        })
    }

    onRequestCity=(parent)=>{
        //const isLeaf=String(parent.id).length==2?true:false
        global.request.get('/api/area/city',{pid:parent.id}).then(data=>{
            //data.records.map(item=>item.isLeaf=true)
            //parent.children=data.records
            //this.setState({options:[...this.state.options]})
            console.log('fetching frontend')
        })
    }

    loadState=(states=[])=>{
        console.log("enter loadState function")
        const selected=states[states.length-1]
        
        this.onRequestCity(selected)

        
        
    }
    render(){
        return <Cascader placeholder='State/Suburb'
        options={this.state.options}
        loadData={this.loadState}
        />
    }
}