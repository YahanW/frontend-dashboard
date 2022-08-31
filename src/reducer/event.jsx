const initState={
    eventModal:null
}

export default (state=initState,action)=>{
    const {type,data}=action;
    switch(type){
        case 'show':
            return {...state,eventModal:data}
        case 'hide':
            return {...state,eventModal:null}
        default:
            return initState
    }
}