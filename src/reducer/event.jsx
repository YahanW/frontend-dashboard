const initState={
    eventModal:null
}

export default (state=initState,action)=>{
    const {type,data,serviceList}=action;
    switch(type){
        case 'show':
            return {...state,eventModal:data,List:serviceList}
        case 'hide':
            return {...state,eventModal:null}
        default:
            return initState
    }
}