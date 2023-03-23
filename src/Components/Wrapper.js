import React, { useContext } from "react";

// Context
import { UserContext } from "../App";

// Components
import Login from "./Login";
import Chat from "./Chat/Chat";

function Wrapper() {

    const user = useContext(UserContext);

    return (
        <>
            { user.username === undefined ? <Login/> : <Chat/> }
        </>
    )
}

export default Wrapper;