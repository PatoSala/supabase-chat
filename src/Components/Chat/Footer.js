import React, { useContext, useState } from "react";
import { UserContext } from "../../App";

function Footer({ sendMessage }) {

    const session = useContext(UserContext);

    const [value, setValue] = useState('')

    const handleOnChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        sendMessage(value);
        setValue('');
    }

    return (
        <div className="footer" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', height: 60}}>

            <input type="text" placeholder="Write something..." style={{ width: '100%'}} value={value} onChange={handleOnChange}></input>
            
            <button style={{ margin: '0px 10px'}} onClick={handleSubmit}>Send</button>

        </div>
    )
}

export default Footer;