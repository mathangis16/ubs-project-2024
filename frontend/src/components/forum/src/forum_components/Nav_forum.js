import React from "react";
import { useNavigate } from "react-router-dom";

const Nav_forum = () => {
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("_id");
        //redirects to the login page
        navigate("/");
    };
    const website = () => {
        localStorage.removeItem("_id");
        //redirects to the login page
        navigate("localhost:5173/chat");
    };
    return (
        <nav className='navbar'>
            <h2>ToChat</h2>
            <div className='navbarRight'>
                <button onClick={signOut}>Sign out</button>
                <button onClick={website}>Go back to Chat</button>
            </div>
        </nav>
    );
};

export default Nav_forum;