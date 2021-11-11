import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import useAxios from "../../shared/hooks/useAxios";
import { useEffect } from "react";
import { UserContext, UserProvider } from "../../shared/context/UserContext";

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
  }, [json]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
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
                  // error={error && (username.length < 4 || username.length > 20)}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  // helperText="Username must be between 4 and 20 characters in length"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  // error={error && (password.length < 8 || password.length > 20)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // helperText="Password must be between 8 and 20 characters"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                if (username.length < 4 || password.length < 8) {
                  setError(true);
                  return;
                }
                console.log({ username, password });
                apiCall("/api/users/login", { username, password });
              }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign up by clicking here!
                </Link>
              </Grid>
            </Grid>
            <div>{resError}</div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
