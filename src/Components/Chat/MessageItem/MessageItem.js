import React, { useContext } from "react";
import "./MessageItem.css";

// Context
import { UserContext } from "../../../App";

// Supabase
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://jhdzfvickkuntlbimgls.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZHpmdmlja2t1bnRsYmltZ2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1OTA5NzUsImV4cCI6MTk5NTE2Njk3NX0.N1fySNLgACXC_jt4J3ByYYTT08ABJUfS-fD-C0VIsz4");

function MessageItem({props}) {

    const session = useContext(UserContext);

    const msg = props.msg;
    console.log(msg.owner, session.user);
    const index = props.index;
    const array = props.array;

    return (
        <div className="msg-item" style={{
                justifyContent: msg.owner.name === session.user.name ? 'flex-end' : msg.owner === 'system' ? 'center' : 'flex-start',
                marginBottom: msg.owner !== 'system' ? (
                    array[index - 1] && array[index - 1].owner.name == msg.owner.name ? (
                        3
                    ) : 10
                ) : null
        }}>
            {
                msg.owner !== 'system' && msg.owner.name !== session.user.name ? (
                    array[index + 1] && array[index + 1].owner.name == msg.owner.name ? (
                        <div className="msg-owner-pic-empty"></div>
                    ) : (
                        <div className="msg-owner-pic">
                            <img src={msg.owner.profile_pic} width="100%"/>
                        </div>
                    )
                ) : null
            }
            <div className="msg-bubble" style={{
                backgroundColor: msg.owner.name === session.user.name ? '#3fcf8e' : msg.owner === 'system' ? null : '#232323',
                borderWidth: msg.owner !== 'system' ? 1 : 0,
            }}>
                    {
                        msg.owner !== 'system' && msg.owner.name !== session.user.name ? (
                            array[index + 1] && array[index + 1].owner.name == msg.owner.name ? (
                                null
                            ) : (
                                <p className="msg-owner">
                                    { msg.owner.name }
                                </p>
                            )
                        ) : null
                    }

                <p className="msg-body" style={{
                    color: msg.owner === 'system' ? '#4d4d4d' : '#FFFFFF',
                }} key={msg.id}>{msg.body}</p>
            </div>
        </div>
    )
}

export default MessageItem;