import axios from "axios";

const doAxios=(url,method,value)=>{
    return axios({
        method,
        url,
        params:method=='get'? value:undefined,
        data:method=='post'? value:undefined
    }).then((res)=>{
        if(res.status==200){
            const {data}=res;
            if(data.code!='00000'){
                return Promise.reject(data)

            }
            
            return data
        }
    })
}

export default {
    get:(url,params)=>{
        return doAxios(url,'get',params)
    },
    post:(url,params)=>{
        return doAxios(url,'post',params)
    },
}