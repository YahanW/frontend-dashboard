import React, { Component } from 'react'
import { Cascader } from 'antd'
export default class extends Component{
    constructor(props){
        super(props)
        this.state={options:[]}
    }

    componentDidMount(){
        global.request.get('/api/area/state').then( ({records=[]})=>{
            this.setState({options:records})
           
            //console.log(this.state.options)
        })
    }

    onRequestCity=(parent)=>{
        console.log('request cities')
        global.request.get('/api/area/state',{pid:parent.id}).then(data=>{
      
            parent.children=data.records
           
            this.setState({options:[...this.state.options]})
            console.log(this.state.options)
        })
    }

    loadState=(states=[])=>{
        const selected=states[states.length-1]
        this.onRequestCity(selected)
    }
    render(){
        return <Cascader placeholder='State/Suburb'
        options={this.state.options}
        onChange={this.loadState}
        />
    }
}