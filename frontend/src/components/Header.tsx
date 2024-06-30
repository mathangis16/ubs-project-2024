import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "#543d7b", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              {/* <NavigationLink
                bg="#f99417"
                to="/chat"
                text="Chat"
                textColor="white"
              /> */}
              <NavigationLink
                bg="#f99417"
                to="/menu"
                text="Menu"
                textColor="white"
              />
              <NavigationLink
                bg="#f99417"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#f99417"
                to="/login"
                text="Login"
                textColor="white"
              />
              <NavigationLink
                bg="#f99417"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;