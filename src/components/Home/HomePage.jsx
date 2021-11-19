import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext } from "../../shared/context/UserContext";
import { GameContext } from "../../shared/context/GameContext";
import { GroupAddOutlined, GroupsOutlined } from "@mui/icons-material";

const theme = createTheme();

export default function HomePage() {
  const [gameId, setGameId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsHost, user } = useContext(UserContext);
  const { setHost, setPlayers, setIsTurn } = useContext(GameContext);

  const generateGameId = () => {
    return Math.random().toString(36).substr(2, 6);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const joinGame = () => {
    if (gameId.length !== 6) {
      setError(true);
    } else {
      navigate(`/game/${gameId}`);
    }
  };

  useEffect(() => {
    setIsHost(false);
    setPlayers([]);
    setIsTurn(null);
  }, [setIsHost, setPlayers, setIsTurn]);

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
            position: "relative",
          }}
        >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginRight: "20px",
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
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "#1f2f53",
                    "&:hover": {
                      background: "#1f2f53ab",
                    },
                  }}
                  onClick={joinGame}
                >
                  Join Table
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {error && (
                    <Alert severity="error">
                      Table number must be 6 characters
                    </Alert>
                  )}
                </Box>
              </Box>
            </Box>
          </Container>
          <Divider orientation="vertical" flexItem />
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                paddingBottom: "43px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "absolute",
                top: "64px",
                right: "90px",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#1f2f53" }}>
                <GroupAddOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Start a Table
              </Typography>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    maxWidth: "194px",
                    bgcolor: "#1f2f53",
                    "&:hover": {
                      background: "#1f2f53ab",
                    },
                  }}
                  onClick={(e) => {
                    const newGameId = generateGameId();
                    setHost(user.username);
                    setIsHost(true);
                    navigate(`/game/${newGameId}`);
                  }}
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
