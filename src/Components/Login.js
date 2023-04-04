import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import "./Login.css";
import supabaseLogo from '../supabase-logo.png';

// Supabase
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://jhdzfvickkuntlbimgls.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZHpmdmlja2t1bnRsYmltZ2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1OTA5NzUsImV4cCI6MTk5NTE2Njk3NX0.N1fySNLgACXC_jt4J3ByYYTT08ABJUfS-fD-C0VIsz4");

function Login() {

    const session = useContext(UserContext);

    supabase
    .channel('members_channel')
    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'users'
        },
        (payload) => {
            session.updateContext(payload.new);
        }
    )
    .subscribe();
    
    const [value, setValue] = useState('');

    const handleOnChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        signIn()
    }

    const signIn = async () => {
        const { data, error } = await supabase.from('users')
            .select()
            .eq('name', value)
        
        if (data.length === 0) {
            const { error } = await supabase.from('users').insert({ name: value });
        } else {
            session.updateContext(data[0]);
        }
    }

    return (
        <div className="login-wrapper" style={{ margin: '0 auto', marginTop: 100}}>
            <img src={supabaseLogo} alt="supabase" width={50} style={{ marginBottom: 20}}></img>
            <h1 style={{ color: 'white', position: 'relative', bottom: 40}}>Supachat</h1>
            <input type="text" className="username-input" value={value} placeholder="Enter a username" onChange={handleOnChange}></input>
            <br/>
            <button className="button" style={{ width: '100%', marginTop: 20, borderRadius: '.375rem'}} onClick={handleSubmit}>Sign In</button>

            <p style={{ color: '#3e3e3e', fontSize: 12}}>Powered by <a href="https://supabase.com/" target="_blank" style={{ textDecoration: 'none', color: '#3e3e3e'}}>Supabase</a></p>
        </div>
    )
}

export default Login;