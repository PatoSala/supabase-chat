import React, { useContext, useEffect } from "react";
import "./Messages.css";

// Components
import MessageItem from "./MessageItem/MessageItem";

function Messages({ messages, members }) {

    /* useEffect(() => {
        members.map(member => {
            console.log(member.name)
        })
    }, [members]) */

    return (
        messages.length === 0 && members.length === 0 ? (
            <div className="messages-container" style={{ dispay: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, scrollbarWidth: 1, overflowY: 'scroll'}}>
                <p style={{ color: 'white' }}>Empty</p>
            </div>
        ) : (
            <div className="messages-container">
                {
                    messages.map((msg, index, array) => {
                        let owner = members.find(member => member.user_id === msg.owner_id);
                        return (
                            <MessageItem props={{
                                msg: msg,
                                members: members,
                                owner: owner,
                                index: index,
                                array: array,
                                prevMsg: array[index + 1] ? array[index + 1] : null,
                                nextMsg: array[index - 1] ? array[index - 1] : null
                            }}/>
                        )
                    })
                }
            </div>
        )
    )
}

export default Messages;