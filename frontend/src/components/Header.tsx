import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/ToolBar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

// bgcolor: #546da6
const Header = () => {
    const auth = useAuth();
    return (
        <AppBar sx={{bgcolor: "transparent", position:"static", boxShadow:"none"}}>
            <Toolbar sx={{display: "flex"}}>
                <Logo />
                <div>{auth?.isLoggedIn ? (
                <>
                    <NavigationLink
                        bg="#51538f"
                        to="/chat"
                        text="Go To Chat"
                        textColor="white"
                    />
                    <NavigationLink
                        bg="#51538f"
                        to="/"
                        text="Logout"
                        textColor="white"
                        onClick={auth.logout}
                    />
                </>):(
                <>
                    <NavigationLink
                        bg="#51538f"
                        to="/login"
                        text="Login"
                        textColor="white"
                    />
                    <NavigationLink
                        bg="#51538f"
                        to="/signup"
                        text="Signup"
                        textColor="white"
                    />
                </>)}</div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;