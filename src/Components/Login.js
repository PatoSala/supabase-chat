import React, { useContext, useState } from "react";
import { UserContext } from "../App";

function Login() {

    const user = useContext(UserContext);
    
    const [value, setValue] = useState('')

    const handleOnChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        console.log(user.updateContext(value));
    }

    return (
        <div className="login-wrapper" style={{ margin: 'auto'}}>
            <input type="text" className="username-input" value={value} placeholder="Enter a username" onChange={handleOnChange}></input>
            <br/>
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default Login;