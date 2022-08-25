const initState={
    userModal:null, //basic info modal not shown yet
    levelModal:null //modal to level up user not shown yet
}

export default (state=initState,action)=>{
    const {type,data}=action;
    switch(type){
        case 'show'://edit
            return {...state,userModal:data}
        case 'hide'://view
            return {...state,userModal:null}
        case 'showLevelModal'://delete
            return {...state,levelModal:data}
        case 'hideLevelModal'://create
            return {...state,levelModal:null}
        default:
            return initState
    }
}