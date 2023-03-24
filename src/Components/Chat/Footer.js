import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import "./Footer.css";

function Footer({ sendMessage }) {

    const session = useContext(UserContext);

    const [value, setValue] = useState('')

    const handleOnChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        sendMessage(session.username, value);
        setValue('');
    }

    return (
        <div className="footer">

            <input className="footer-input" type="text" placeholder="Write something..." style={{
                width: '100%',
                backgroundColor: '#292929',
            }} value={value} onChange={handleOnChange}></input>
            
            <button className="button" style={{ margin: '0px 10px'}} onClick={handleSubmit}>Send</button>

        </div>
    )
}

export default Footer;