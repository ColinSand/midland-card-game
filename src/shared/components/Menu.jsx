import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import "./Menu.css";
import { Typography } from "@mui/material";

export default function Menu() {
  const { user, clearState } = useContext(UserContext);

  return (
    <div>
      <nav>
        <AppBar position="static" sx={{ bgcolor: "#1f2f53" }}>
          <Toolbar variant="regular">
            <Typography variant="h5">Migos 5 Card Draw</Typography>
            {!user.username && (
              <>
                <NavLink to="/login" className="link">
                  Login
                </NavLink>


                <NavLink to="/signup" className="link">
                  Signup
                </NavLink>
              </>
            )}
            {user.username && (
              <>
                <NavLink to="/home" className="link">
                  Home
                </NavLink>
                <NavLink to="/login" onClick={clearState} className="link">
                  Logout
                </NavLink>
              </>
            )}
            <NavLink to="/about" className="link">
              About
            </NavLink>
          </Toolbar>
        </AppBar>
      </nav>
    </div>
  );
}
