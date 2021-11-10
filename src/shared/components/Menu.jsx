import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default function Menu() {
  const { user, clearState } = useContext(UserContext);

  return (
    <div>
      <nav>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Typography color="inherit">
                <NavLink to="/about">About</NavLink>
                {!user.username && (
                  <>
                    <NavLink to="/signup">Signup</NavLink>
                    <NavLink to="/login">Login</NavLink>
                  </>
                )}
                {user.username(
                  <>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/Game">Game</NavLink>

                    <button onClick={clearState}>Logout</button>
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
