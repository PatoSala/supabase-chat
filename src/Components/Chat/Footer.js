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
        if (value.length > 0) {
            if (!value.replace(/\s/g, '').length) {
                console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
            } else {
                sendMessage(session.username, value);
                setValue('');
            }
        }
    }

    return (
        <div className="footer">

            <input className="footer-input" type="text" placeholder="Write something..." style={{
                width: '100%',
                backgroundColor: '#292929',
            }} value={value} onChange={handleOnChange}></input>
            
            <button className="button" style={{marginLeft: 10}} onClick={handleSubmit}>Send</button>

        </div>
    )
}

export default Footer;