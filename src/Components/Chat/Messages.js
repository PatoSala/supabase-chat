import React, { useContext } from "react";
import "./Messages.css";

// Context
import { UserContext } from "../../App";

function Messages({ messages }) {

    const session = useContext(UserContext);

    return (
        messages.length === 0 ? (
            <div className="messages-container" style={{ dispay: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, scrollbarWidth: 1, overflowY: 'scroll'}}>
                <p style={{ color: 'white' }}>Empty</p>
            </div>
        ) : (
            <div className="messages-container" style={{ dispay: 'flex', flexDirection: 'column-reverse', flex: 1, paddingBottom: 60, paddingTop: 60 }}>
                {
                    messages.map((msg, index, array) => (
                        <div className="msg-bubble" style={{
                            alignSelf: msg.owner === session.username ? 'flex-end' : msg.owner === 'system' ? 'center' : 'flex-start',
                            backgroundColor: msg.owner === session.username ? '#3fcf8e' : msg.owner === 'system' ? null : '#232323',
                            borderWidth: msg.owner !== 'system' ? 1 : 0,
                        }}>
                                {
                                    msg.owner !== 'system' && msg.owner !== session.username ? (
                                        array[index + 1] && array[index + 1].owner == msg.owner ? (
                                            null
                                        ) : (
                                            <p className="msg-owner">
                                                { msg.owner }
                                            </p>
                                        )
                                    ) : null
                                }

                            <p className="msg-body" style={{
                                color: msg.owner === 'system' ? '#4d4d4d' : '#FFFFFF',
                            }} key={msg.id}>{msg.body}</p>
                        </div>
                    ))
                }
            </div>
        )
    )
}

export default Messages;