import * as icons from '@ant-design/icons'
import _ from 'lodash'

function fetchingIcons(){
    const allIcons=[]
    _.mapValues(icons,(value,key)=>{
      
        if(typeof value==='object'&&key!=='default'){ //checking the correct value
            allIcons.push({name:key,renderDf:value})    //push into set
        }
    })
    return allIcons //return all icon
}

export default fetchingIcons()  //return the function