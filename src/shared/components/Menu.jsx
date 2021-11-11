import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";

import "./Menu.css";

export default function Menu() {
  const { user, clearState } = useContext(UserContext);

  return (
    <div>
      <nav>
        <AppBar position="static" sx={{ bgcolor: "#1f2f53" }}>
          <Toolbar variant="regular">
            <header className="menuHeader">
              Migos 5 Card Draw
              <NavLink to="/about" className="link">
                About
              </NavLink>
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
                  <NavLink to="/Game" className="link">
                    Game
                  </NavLink>

                  <button onClick={clearState} className="logout">
                    Logout
                  </button>
                </>
              )}
            </header>
          </Toolbar>
        </AppBar>
      </nav>
    </div>
  );
}
