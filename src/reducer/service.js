const initState={
    modalForm:null
}

export default (state=initState,action)=>{
    const {type,data}=action;
    switch(type){
        case 'show':
            return {...state,modalForm:data}
        case 'details':
                return {...state,modalForm:data}
        case 'hide':
            return {...state,modalForm:null}
        default:
            return initState
    }
}