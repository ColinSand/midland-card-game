import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import "./Menu.css";

export default function Menu() {
  const { user, clearState } = useContext(UserContext);

  return (
    <div>
      <nav>
        <AppBar position="static" sx={{ bgcolor: "#1f2f53" }}>
          <Toolbar variant="regular">
            {/* <Typography color="white"> */}
            {/* <Button sx={{ bgcolor: "#fffb00" }}> */}
            <NavLink to="/about" className="link">
              About
            </NavLink>
            {/* </Button> */}
            {!user.username && (
              <>
                {/* <Button sx={{ bgcolor: "#fffb00" }}> */}
                <NavLink to="/login" className="link">
                  Login
                </NavLink>
                {/* </Button> */}
                {/* <Button sx={{ bgcolor: "#fffb00" }}> */}
                <NavLink
                  to="/signup"
                  className={(isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  Signup
                </NavLink>
                {/* </Button> */}
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

                <Button onClick={clearState}>Logout</Button>
              </>
            )}
            {/* </Typography> */}
          </Toolbar>
        </AppBar>
      </nav>
    </div>
  );
}
