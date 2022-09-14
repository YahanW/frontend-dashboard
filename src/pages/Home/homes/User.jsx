import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Logger from 'simple-console-logger';

function User() {
    
    const [user, setUser] = useState(null);
    const url = "";

    useEffect(() => {
        axios.get(url)
            .then( res => {
                setUser(res.data);
                console.log(res.data);
            });
    }, []);

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
            </div>
        )
    } else {
        return null;
    };
    

}

export default User