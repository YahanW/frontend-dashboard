const initState={
    userModal:null, //basic info modal not shown yet
    levelModal:null //modal to level up user not shown yet
}

export default (state=initState,action)=>{
    const {type,data}=action;
    switch(type){
        case 'show':
            return {...state,userModal:data}
        case 'hide':
            return {...state,userModal:null}
        case 'showLevelModal':
            return {...state,levelModal:data}
        case 'hideLevelModal':
            return {...state,levelModal:null}
        default:
            return initState
    }
}