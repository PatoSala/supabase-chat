import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import "./Footer.css";

function Footer({ sendMessage }) {

    const session = useContext(UserContext);

    const [value, setValue] = useState('')

    const handleOnChange = (e) => {
        setValue(e.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (value.length > 0) {
                if (!value.replace(/\s/g, '').length) {
                    console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
                } else {
                    sendMessage(session.user, value);
                    setValue('');
                }
            }
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.length > 0) {
            if (!value.replace(/\s/g, '').length) {
                console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
            } else {
                sendMessage(session.user, value);
                setValue('');
            }
        }
    }

    /* useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, []); */

    return (
        <div className="footer">

            <input className="footer-input" type="text" placeholder="Write something..." style={{
                width: '100%',
                backgroundColor: '#292929',
            }} value={value} onChange={handleOnChange} onKeyDown={handleKeyDown}></input>
            
            <button className="button" style={{marginLeft: 10}} onClick={handleSubmit}>Send</button>

        </div>
    )
}

export default Footer;