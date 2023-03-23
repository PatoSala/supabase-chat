import React, { useContext } from "react";
import { UserContext } from "../../App";

function Header() {

    const session = useContext(UserContext);

    const handleSignOut = () => {
        session.updateContext(undefined,)
    }

    return (
        <div className="header" style={{ display: 'flex', width: '100%', height: 60, alignItems: 'center', justifyContent: 'space-between'}}>
            <h2 style={{ margin: '0px 10px', color: 'white' }}>{session.username}</h2>
            <button style={{ margin: '0px 10px'}} onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default Header;