import React, { useContext } from "react";

// Context
import { UserContext } from "../../App";

function Messages({ messages }) {

    const session = useContext(UserContext);

    return (
        messages.length === 0 ? (
            <div className="messages-container" style={{ dispay: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, scrollbarWidth: 1}}>
                <p style={{ color: 'white' }}>Empty</p>
            </div>
        ) : (
            <div className="messages-container" style={{ dispay: 'flex', flexDirection: 'column-reverse', flex: 1, paddingBottom: 60, paddingTop: 60 }}>
                {
                    messages.map(msg => (
                        <div className="msg-bubble" style={{
                            width: 'fit-content',
                            alignSelf: msg.owner === session.username ? 'flex-end' : msg.owner === 'system' ? 'center' : 'flex-start',
                            backgroundColor: msg.owner === session.username ? '#3fcf8e' : msg.owner === 'system' ? null : '#232323',
                            borderWidth: msg.owner !== 'system' ? 1 : 0,
                            borderColor: '#282828',
                            borderStyle: 'solid',
                            borderRadius: 10,
                            margin: '5px 0px'
                        }}>
                            <p style={{
                                color: msg.owner === 'system' ? '#4d4d4d' : '#FFFFFF',
                                margin: '4px 10px'
                            }} key={msg.id}>{msg.body}</p>
                        </div>
                    ))
                }
            </div>
        )
    )
}

export default Messages;