import React, { useContext } from "react";
import { GameContext } from "../../shared/context/GameContext";
import { UserContext } from "../../shared/context/UserContext";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useSocket from "../../shared/hooks/useSocket";
import { Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Player from "./components/Player/Player";
import Chat from "./components/Chat/Chat";
import "./GamePage.css";

const theme = createTheme();

function GamePage() {
  const { isHost } = useContext(UserContext);
  const { players, gameActive, host, deck } = useContext(GameContext);
  const { id } = useParams();
  const { message, sendChat, drawCards, startGame } = useSocket(id);
  const navigate = useNavigate();

  return (
    // Main container box
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        marginTop: "10px",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* LEFT BOX */}
        <Box className="chat-info flex">
          <Box item className="game-info">
            <Typography variant="h6">
              Game Code:
              {id}
            </Typography>
            <Typography variant="h6">Host: {host}</Typography>
            {isHost && (
              <Button
                sx={{ width: 150, height: 20 }}
                variant="contained"
                onClick={() => navigate("/home")}
              >
                Close Game
              </Button>
            )}
          </Box>

          <Box className="chat flex column" sx={{ flexBasis: "100%" }}>
            <Chat message={message} sendChat={sendChat} />
          </Box>
        </Box>
        <Box className="player-info flex">
          <Typography
            className="heading text-center"
            sx={{ maxHeight: "100px" }}
            variant="h5"
          >
            Players
          </Typography>

          {isHost && !gameActive && (
            <Box item sx={{ flexBasis: "100%", textAlign: "center" }}>
              <Button
                sx={{ width: 150, height: 40 }}
                variant="contained"
                onClick={startGame}
              >
                Start Game
              </Button>
            </Box>
          )}
          {!isHost && !gameActive && (
            <Typography
              variant="h6"
              sx={{ flexBasis: "100%" }}
              className="text-center"
            >
              {deck.length === 0 && (
                <div>The game will start when the host begins</div>
              )}
              {deck.length > 0 && <div>Game Over</div>}
            </Typography>
          )}
          <Box className="players column">
            {players.map((val, idx) => (
              <Player
                player={val}
                playerIdx={idx}
                key={idx}
                drawCards={drawCards}
              />
            ))}
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default GamePage;
