import React from "react";
import {Menu} from 'antd'

import {Link} from 'react-router-dom'
class Slider extends React.Component{
    constructor(props){
        super(props)
        this.state={menus:[
            {name:'Service',id:'1',linkUrl:'/service'},
            {name:'Members',id:'2',
                children:[{name:"Users",id:'21',
                    linkUrl:"/member/user"
                },{name:"Merchants",id:'22',
                    linkUrl:"/member/merchant"},]},
            {name:'Booking Requests',id:'3',
                    linkUrl:"/booking"}
        ]}
    }
    onRenderMenu=(menus)=>{
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