const initState={
    modalForm:null //modal not shown yet
}

export default (state=initState,action)=>{
    const {type,data}=action;
    switch(type){
        case 'show':
            return {...state,userModal:data}
        case 'hide':
            return {...state,userModal:null}
        default:
            return initState
    }
}