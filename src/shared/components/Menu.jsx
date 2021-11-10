import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

export default function Menu() {
  const { user, clearState } = useContext(UserContext);

  return (
    <div>
      <nav>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className="classes.menuButton"
              color="inherit"
              aria-label="menu"
            >
              <Typography color="inherit">
                <NavLink to="/about">About</NavLink>
                {!user.username && (
                  <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Signup</NavLink>
                  </>
                )}
                {user.username(
                  <>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/Game">Game</NavLink>

                    <Button onClick={clearState}>Logout</Button>
                  </>
                )}
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
      </nav>
    </div>
  );
}
