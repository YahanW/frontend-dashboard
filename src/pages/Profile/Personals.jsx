import React, { useState } from 'react'
import './Person.css'
function Personals(){
  const [editing,setEdit] = useState(false);
  const [isEnabled,setEnabled] = useState(true);
  const onChangePerson = () =>{
    setEdit(true)
    setEnabled(false)
  }
  const onConfirm = () =>{
    setEdit(false)
    setEnabled(true)
  }
    return (
      <div className='PersonList'>
        <div className='List'>
          <div className='left'>
            First Name
            <input value={'Mingke'} disabled={isEnabled}/>
            Last Name
            <input value={'Deng'} disabled={isEnabled}/>
            Birth Date
            <input value={'1999/05/12'} disabled={isEnabled}/>
          </div>
          <div className='right'>
            Phone
            <input value={'(61)-12345678'} disabled={isEnabled}/>
            Email
            <input value={'mingked@utas.edu.au'} disabled={isEnabled}/>
            Address
            <input value={'1 branch St, Sandybay Tas'} disabled={isEnabled}/>
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
