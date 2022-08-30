import React from "react";
import {Menu} from 'antd'

import {Link} from 'react-router-dom'
class Slider extends React.Component{
    constructor(props){
        super(props)
        this.state={menus:[
            {name:'Services',id:'1',linkUrl:'/dashboard/service'},
        ]}
    }
    onRenderMenu=(menus)=>{
        if(sessionStorage.getItem('access')==1)
        {
            this.state.menus.push({
                name:'Members',id:'2',
                children:[{name:"Users",id:'21',
                    linkUrl:"/dashboard/member/user"
                },{name:"Merchants",id:'22',
                    linkUrl:"/dashboard/member/merchant"},]
                
            })
        }
        return menus.map(menu=>{
           
            if(menu.children&&menu.children.length){
                return <Menu.SubMenu key={menu.id} title={menu.name}>
                   
                    {this.onRenderMenu(menu.children)}
                    </Menu.SubMenu>
            }else{
                return <Menu.Item key={menu.id}><Link to={menu.linkUrl}>{menu.name}</Link></Menu.Item>
            }
        })
    }
    render(){
        return <Menu theme="dark" mode="inline">
            {this.onRenderMenu(this.state.menus)}
            
        </Menu>
    }
}

export default Slider