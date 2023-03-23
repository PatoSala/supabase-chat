import React, { useState, useEffect, useContext } from "react";

// Context
import { UserContext } from "../../App";

function Messages({ messages }) {

    const session = useContext(UserContext);

    return (
        messages.length === 0 ? (
            <div className="messages-container" style={{ dispay: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1}}>
                <p style={{ color: 'white' }}>Empty</p>
            </div>
        ) : (
            <div className="messages-container" style={{ dispay: 'flex', flexDirection: 'column', flex: 1 }}>
                {
                    messages.map(msg => (
                        <p style={{ color: 'white', width: 'fit-content', alignSelf: msg.owner === session.username ? 'flex-end' : null}} key={msg.id}>{msg.body}</p>
                    ))
                }
            </div>
        )
    )
}

export default Messages;