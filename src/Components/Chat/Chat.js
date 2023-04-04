import React, { useState, useContext, useEffect, useRef } from "react";
import "./Chat.css";

// Context
import { UserContext } from "../../App";

// Components
import Header from "./Header";
import Messages from "./Messages";
import Footer from "./Footer";

// Supabase
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://jhdzfvickkuntlbimgls.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZHpmdmlja2t1bnRsYmltZ2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1OTA5NzUsImV4cCI6MTk5NTE2Njk3NX0.N1fySNLgACXC_jt4J3ByYYTT08ABJUfS-fD-C0VIsz4");

function Chat() {

    const isMounted = useRef(false);

    const session = useContext(UserContext);

    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);

    async function getMembers() {
        const { data } = await supabase.from("users").select();
        setMembers(data);
    }

    async function getMessages() {
        const { data } = await supabase.from("messages").select().order('created_at', { ascending: true });
        setMessages(data.reverse());
    }

    async function sendMessage(ownerId, message, isSystemMsg) {
        
        const { error } = await supabase.from('messages').insert({
            owner_id: ownerId === null ? null : ownerId,
            body: message,
            system_msg: isSystemMsg
        });

        getMessages();

        if (error) {
            console.log(error);
        }
    }

    supabase
    .channel('messages_channel')
    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'messages'
        },
        (payload) => {
            getMessages();
        }
    )
    .subscribe();

    supabase
    .channel('members_channel')
    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'users'
        },
        (payload) => {
            getMembers();
            console.log('updated members!', payload);
            if (payload.new.user_id === session.user.user_id) {
                session.updateContext(payload.new);
                console.log(payload.new.profile_pic, session.user.profile_pic)
            }
        }
    )
    .subscribe();   

    useEffect(() => {
        getMembers();
        getMessages();
        sendMessage(null, session.user.name + ' joined', true);
    }, []);

    /* const channel = supabase.channel('test');

    channel
    .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log(key, newPresences)
    })
    .subscribe() */

    return (
        <div className="chat-wrapper">
            <Header sendMessage={sendMessage}/>
            <Messages messages={messages} members={members}/>
            <Footer sendMessage={sendMessage}/>
        </div>
    )
}

export default Chat;