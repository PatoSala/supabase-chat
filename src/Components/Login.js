import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import "./Login.css";

function Login() {

    const user = useContext(UserContext);
    
    const [value, setValue] = useState('');

    const handleOnChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        user.updateContext(value);
    }

    return (
        <div className="login-wrapper" style={{ margin: 'auto'}}>
            <h1 style={{ color: 'white', position: 'relative', bottom: 40}}>Supachat</h1>
            <input type="text" className="username-input" value={value} placeholder="Enter a username" onChange={handleOnChange}></input>
            <br/>
            <button className="button" style={{ width: '100%', marginTop: 20}} onClick={handleSubmit}>Sign In</button>
        </div>
    )
}

export default Login;