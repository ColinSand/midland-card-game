import React, { useContext } from "react";
import { GameContext } from "../../shared/context/GameContext";
import { UserContext } from "../../shared/context/UserContext";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import useSocket from "../../shared/hooks/useSocket";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Player from "./components/Player/Player";
import Chat from "./components/Chat/Chat";
import "./GamePage.css";

// the center of this page should have all of the usernames with their cards (face down)
// your cards face up with the draw and stay buttons, then check up to 3 boxes to select cards to draw/replace.
// most of the card functionality will come from seth

// further breakdown:
// display game code-displayed on the game page, but also need to pass this into the useSocket hook (not sure if done properly)
// show host's name - now shows in the top left
// card functionality? i believe seth will be taking care of most of this
// choose which cards to discard on your turn?
// set up a spot for chat to be implemented
// set up spot for cards and players (middle of page)
// show whos turn it currently is (top right of page)
// need to map through the players array that is given by Seth, should show the cards only for that player
// then, on turn let them select up to 3 of the 5 cards in their hand to exchange for the top card (draw function)

// for the players and cards map through the users, and generate players (pass in draw cards, player(mapped through players array) player index)
// Seth is looking for the "player" and playerIdx props to be passed in to his playercomponent.
// need to pull drawCards from the useSocket hook?
// ultimately i need to get Seth drawCards, player, playerIdx.
// use object deconstruction with the useSocket hook

// for Chat- I will need message, sendChat, as props,  maybe something else, probably not

const theme = createTheme();

function GamePage() {
  const { isHost } = useContext(UserContext);
  const { players, gameActive, host } = useContext(GameContext);

  // the following needs to get route parameter, then pass that to useSocket hook
  const { id } = useParams();
  const { message, sendChat, drawCards, startGame } = useSocket(id);

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
          </Box>
          {/* <Box item>
            <div>Hosted By:{isHost}</div>
          </Box> */}
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
                hidden={!isHost}
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
              The game will start when the host begins
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
