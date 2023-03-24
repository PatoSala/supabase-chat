import React, { useContext } from "react";
import { UserContext } from "../../App";

function Header({ sendMessage }) {

    const session = useContext(UserContext);

    const handleSignOut = () => {
        sendMessage('system', session.username + " left");
        session.updateContext(undefined,)
    }

    return (
        <div className="header" style={{
            display: 'flex',
            maxWidth: '59.9rem',
            flex: 1,
            position: 'fixed',
            backgroundColor: '#1c1c1c',
            width: '100%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: '0px 0px 1px 0px',
            borderColor: '#282828',
            borderStyle: 'solid',
        }}>
            <div className="left-header-content" style={{ display: 'flex', alignItems: 'center', margin: '0 10px'}}>
                <div className="profile-pic" style={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'gray',
                    borderRadius: 100
                }}></div>

                <h2 style={{ margin: '0px 10px', color: 'white', fontSize: '1.2rem', lineHeight: '2.25rem'}}>{session.username} (You)</h2>
            </div>

            <button className="button" style={{ margin: '0px 10px'}} onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default Header;