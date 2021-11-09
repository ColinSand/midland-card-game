import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

const theme = createTheme();

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState(false);
  const [verifyAge, setVerifyAge] = useState(false);

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //   };

  if (error && username.length < 4) {
    usernameError = (
      <TextField
        error
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        helperText="Username must be at least 4 characters"
      />
    );
  } else {
    usernameNoError = (
      <TextField
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    );
  }

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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {error &&
                  username.length < 4 &&
                  "Username must be at least 4 characters"}

                {/* <div>
                  {error &&
                    username.length < 4 &&
                    "Username must be at least 4 characters"}
                </div> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  helperText="Password must be at least 8 characters"
                />
                <div>
                  {" "}
                  {error &&
                    password.length < 8 &&
                    "Password must be at least 8 characters"}
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="verifypassword"
                  label="Verify Password"
                  type="password"
                  id="verifypassword"
                  autoComplete="verify-new-password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  helperText="These 2 passwords must match"
                />
                <div>
                  {error &&
                    password !== verifyPassword &&
                    "The 2 passwords need to match"}
                </div>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="verifyAge"
                      color="primary"
                      onChange={() => setVerifyAge(true)}

                      //   if (checked={checked}) {
                      //       setVerifyAge(true)
                      //   }
                    />
                  }
                  label="I do declare that I am 21 years of age or older"
                />
                <div>
                  {error && verifyAge == false && "You must be at least 21"}
                </div>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                if (
                  username.length < 4 ||
                  password.length < 8 ||
                  password !== verifyPassword ||
                  verifyAge == false
                ) {
                  setError(true);
                  return;
                }
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
