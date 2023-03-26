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

    async function getMessages() {
        const { data } = await supabase.from("messages").select().order('created_at', { ascending: true });
        setMessages(data.reverse());
    }

    async function sendMessage(owner, message) {
        const { error } = await supabase.from('messages').insert({ owner: owner, body: message });
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

    useEffect(() => {
        if (isMounted.current) {
            getMessages();
            sendMessage('system', session.user.name + ' joined');
        } else {
            isMounted.current = true;
        }
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
            <Messages messages={messages}/>
            <Footer sendMessage={sendMessage}/>
        </div>
    )
}

export default Chat;