import React, { useState, useContext, useEffect } from "react";

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

    const session = useContext(UserContext);

    const [messages, setMessages] = useState([]);

    async function getMessages() {
        const { data } = await supabase.from("messages").select();
        console.log('DATA', data);
        setMessages(data.reverse());
    }

    async function sendMessage(message) {
        const { error } = await supabase.from('messages').insert({ owner: session.username, body: message });
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
                console.log(payload);
                getMessages();
            }
        )
        .subscribe();

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <div className="chat-wrapper" style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <Header/>
            <Messages messages={messages}/>
            <Footer sendMessage={sendMessage}/>
        </div>
    )
}

export default Chat;