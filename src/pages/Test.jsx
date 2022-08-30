import React, {useState} from 'react';
import axios from 'axios';

export default function Test() {

const [details,setDetails] = useState({
        serviceType: '',
        // email:'',
        // password:'',
})

const updateUser = () =>{
    axios.get(`https://eventeasyau.azurewebsites.net/api/services/getservices/1`)
    .then(response=>{
        console.log(response)
    }).catch(
        err=>{
            console.log(err)
        }
    )
}
  return (
    <div>
      <h3>Test User update</h3>
      <form>
        <label for="passwd">Password</label>
        <input type="text" name="password" id="passwd"
        onChange={(event)=>({...details,password:event.target.value})}
        />
        {/* <label for="email">Email</label>
        <input type="text" name="email" id="email"
         onChange={(event)=>({...details,email:event.target.value})}
        />
        <label for="username">UserName</label>
        <input type="text" name="username" id="username"
         onChange={(event)=>({...details,userName:event.target.value})}
        /> */}
         
      </form>
      <button onClick={updateUser}>Update</button>
    </div>
  )
}
