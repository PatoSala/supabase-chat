import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import "./Login.css";
import supabaseLogo from '../supabase-logo.png';

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
        <div className="login-wrapper" style={{ margin: '0 auto', marginTop: 100}}>
            <img src={supabaseLogo} alt="supabase" width={50} style={{ marginBottom: 20}}></img>
            <h1 style={{ color: 'white', position: 'relative', bottom: 40}}>Supachat</h1>
            <input type="text" className="username-input" value={value} placeholder="Enter a username" onChange={handleOnChange}></input>
            <br/>
            <button className="button" style={{ width: '100%', marginTop: 20}} onClick={handleSubmit}>Sign In</button>

            <p style={{ color: '#3e3e3e', fontSize: 12}}>Powered by <a href="https://supabase.com/" target="_blank" style={{ textDecoration: 'none', color: '#3e3e3e'}}>Supabase</a></p>
        </div>
    )
}

export default Login;