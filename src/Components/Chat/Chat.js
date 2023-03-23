import React, { useState, useContext } from "react";
import { UserContext } from "../../App";

function Chat() {

    const user = useContext(UserContext);

    return (
        <div className="chat-wrapper" style={{ margin: 'auto'}}>
            { user.username }
        </div>
    )
}

export default Chat;