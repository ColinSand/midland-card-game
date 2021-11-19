import * as React from "react";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import useAxios from "../../shared/hooks/useAxios";
import { useEffect, useContext } from "react";
import { UserContext } from "../../shared/context/UserContext";
import { Alert } from "@mui/material";
import "./LoginPage.css";

const theme = createTheme();

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { json, error: resError, apiCall } = useAxios("post");
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (json && json.success) {
      setUser(json.data);
    }
  }, [json, setUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1f2f53" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  sx={{ mb: "3px" }}
                  error={error && (username.length < 4 || username.length > 20)}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  helperText="Username must be between 4 and 20 characters in length"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ mb: "3px" }}
                  error={error && (password.length < 8 || password.length > 20)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  helperText="Password must be between 8 and 20 characters"
                />
                <div className="error-container">
                  {resError && <Alert severity="error">{resError}</Alert>}
                </div>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: "15px",
                mb: 2,
                bgcolor: "#1f2f53",
                "&:hover": {
                  background: "#1f2f53ab",
                },
              }}
              onClick={() => {
                if (username.length < 4 || password.length < 8) {
                  setError(true);
                  return;
                }
                apiCall("/api/users/login", { username, password });
              }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink
                  to="/signup"
                  variant="body2"
                  style={{ color: "#1f2f53" }}
                >
                  Don't have an account? Sign up by clicking here!
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
