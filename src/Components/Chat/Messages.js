import React, { useContext } from "react";
import "./Messages.css";

// Components
import MessageItem from "./MessageItem/MessageItem";

function Messages({ messages }) {

    return (
        messages.length === 0 ? (
            <div className="messages-container" style={{ dispay: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, scrollbarWidth: 1, overflowY: 'scroll'}}>
                <p style={{ color: 'white' }}>Empty</p>
            </div>
        ) : (
            <div className="messages-container" style={{ dispay: 'flex', flexDirection: 'column-reverse', flex: 1, paddingBottom: 60, paddingTop: 60 }}>
                {
                    messages.map((msg, index, array) => {
                        return (
                            <MessageItem props={{
                                msg: msg,
                                index: index,
                                array: array
                            }}/>
                        )
                    })
                }
            </div>
        )
    )
}

export default Messages;