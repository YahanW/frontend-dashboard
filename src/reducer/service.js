const initState={
    modalForm:null
}

export default (state=initState,action)=>{
    const {type,data}=action;
    switch(type){
        case 'show':
            return {...state,modalForm:data}
            default:
                return initState
    }
}