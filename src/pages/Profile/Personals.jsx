import React, { useState } from 'react'
import './index'
import './Person.css'
// import axios from 'axios';
function Personals(){
  const [editing,setEdit] = useState(false);
  const [isEnabled,setEnabled] = useState(true);
  const onChangePerson = () =>{setEdit(true);setEnabled(false);}
  const onConfirm = () =>{setEdit(false);setEnabled(true);}

  // const [userInfo,setInfo] = useState({}) //initialise as an empty set
  // const setUser = (data) =>{setInfo(data);}
  // const uid = sessionStorage.getItem('id');
  // useEffect(() => {     //render after every changes
  //    userDetails()
  // });

  // const userDetails = () =>{
	// 	axios.get(`https://eventeasynew.azurewebsites.net/api/user/get/${uid}`)
	// 	.then(response => {
	// 	 setUser(response.data);
	// 	})
	// 	.catch(error=>{
	// 		console.log(error)
	// 	})
	// }
    return (
      <div className='PersonList'>
        <div className='List'>
          <div className='left'>
            First Name
            <input  disabled={isEnabled}/>
            Last Name
            <input  disabled={isEnabled}/>
            Birth Date
            <input  disabled={isEnabled}/>
          </div>
          <div className='right'>
            Phone
            <input  disabled={isEnabled}/>
            Email
            <input  disabled={isEnabled}/>
            Address
            <input  disabled={isEnabled}/>
          </div>
        </div>
        {
          editing ? 
          <button onClick={onConfirm}>Confirm</button>
          :
          <button onClick={onChangePerson}>Edit</button>
        }
        
      </div>
      
   
    )
  }


export default Personals
