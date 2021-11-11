import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { GroupAddOutlined, GroupsOutlined } from "@mui/icons-material";

const theme = createTheme();

export default function HomePage() {
  const [gameId, setGameId] = useState("");

  const generateGameId = () => {
    Math.random().toString(36).substr(2, 6);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  // const joinGame = () => {};

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          sx={{
            maxWidth: "xs",
            marginTop: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
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
                <GroupsOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Join a Table
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
                      required
                      fullWidth
                      id="gameId"
                      label="Table Number"
                      name="gameId"
                      autoComplete="off"
                      value={gameId}
                      onChange={(e) => setGameId(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    setGameId(gameId);
                    console.log(gameId);
                  }}
                >
                  Join Table
                </Button>
              </Box>
            </Box>
          </Container>
          <Divider orientation="vertical" flexItem />
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
                <GroupAddOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Start a Table
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => generateGameId()}
                >
                  Create Table
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
