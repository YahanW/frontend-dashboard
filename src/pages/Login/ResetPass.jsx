/*
This file allows user to reset password 
!!!still in progress.!!! 

Created by Mingke Deng, and Hans Wang
Last Modified: 23/09/2022
*/
import React,{useState} from "react";
import "./Reset.css";

function ResetPass(){
    const [email,setEmail] = useState("");
    return(
        <div >
            <h2>RESET PASSWORD</h2>
            <div className="resForm">
                <div>
                    <label>Email</label>
                    <input placeholder="Your email"/>
                    <button>Send email</button>
                </div>
                <div>
                    <label>Secret Key</label>
                    <input placeholder="Token"/>
                    <button>Verify token</button>
                </div>
                <div>
                    <label>New Password</label>
                    <input placeholder="New Password" disabled={true}/>
                    <button disabled={true}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default ResetPass;