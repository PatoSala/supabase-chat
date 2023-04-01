import React, { useContext } from "react";
import "./MessageItem.css";
import defaultProfilePic from '../../../default.png';

// Context
import { UserContext } from "../../../App";

// Supabase
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://jhdzfvickkuntlbimgls.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZHpmdmlja2t1bnRsYmltZ2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1OTA5NzUsImV4cCI6MTk5NTE2Njk3NX0.N1fySNLgACXC_jt4J3ByYYTT08ABJUfS-fD-C0VIsz4");

function MessageItem({ props }) {

    const session = useContext(UserContext);

    const msg = props.msg;
    const index = props.index;
    const array = props.array;
    const owner = props.owner;
    const prevMsg = props.prevMsg;
    const nextMsg = props.nextMsg;

    const systemMessage = () => {
        return (
            <div className="msg-item" style={{ alignItems: 'center', justifyContent: 'center', margin: '5px, 0px' }}>
                <p 
                    className="msg-body" 
                    style={{
                        color: '#4d4d4d',
                    }} 
                    key={msg.id}
                >
                    { msg.body }
                </p>
            </div>
        )
    }

    const memberMessage = () => {
        return (
            <div className="msg-item" style={{ marginBottom: nextMsg !== null ? (nextMsg.owner_id == msg.owner_id ? 2 : 10 ) : null}}>

                {
                    array[index + 1] && array[index + 1].owner_id == msg.owner_id ? (
                        <div className="msg-owner-pic-empty"></div>
                    ) : (
                        <div className="msg-owner-pic">
                            <img src={owner.profile_pic != null ? owner.profile_pic : defaultProfilePic} width="100%"/>
                        </div>
                    )
                }

                <div className="msg-bubble" style={{
                    backgroundColor: '#232323',
                    borderWidth: 1,
                }}>
                    {
                        prevMsg !== null && prevMsg.owner_id == msg.owner_id ? (
                            null
                        ) : (
                            <p className="msg-owner">
                                { owner.name }
                            </p>
                        )
                    }

                    <p className="msg-body" style={{
                        color: '#FFFFFF',
                    }} key={msg.id}>
                        { msg.body }
                    </p>
                </div>
            </div>
        )
    }

    const userMessage = () => {
        return (
            <div
                className="msg-item" style={{ flexDirection: 'row-reverse' }}
            >
                {/* {
                    array[index + 1] && array[index + 1].owner_id === owner.user_id ? (
                        <div className="msg-owner-pic-empty"></div>
                    ) : (
                        <div className="msg-owner-pic">
                            <img src={session.user.profile_pic != null ? session.user.profile_pic : defaultProfilePic} width="100%"/>
                        </div>
                    )
                } */}

                <div className="msg-bubble" style={{
                    backgroundColor: '#3fcf8e',
                    borderWidth: 1,
                }}>

                    <p className="msg-body" style={{
                        color: '#FFFFFF',
                    }} key={msg.id}>
                        { msg.body }
                    </p>
                </div>
            </div>
        )
    }

    if (msg.system_msg && msg.owner === undefined) {
        return systemMessage();
    } else if (session.user.user_id === msg.owner_id) {
        return userMessage();
    } else {
        return memberMessage();
    }
}

export default MessageItem;