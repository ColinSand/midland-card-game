import React from "react";
import { useContext } from "react";
import { GameContext } from "../../shared/context/GameContext";
import Button from "@mui/material/Button";
import { UserContext } from "../../shared/context/UserContext";

// here we go
// nate's chat will be shown on the left side, towards the bottom

// need to show the game number, hosted by ${host} with a deal/start button that only the host can see.

// top right will have the name of the player who's turn it currently is

// the center of this page should have all of the usernames with their cards (face down)
// your cards face up with the draw and stay buttons, then check up to 3 boxes to select cards to draw/replace.
// most of the card functionality will come from seth

//further breakdown:
// display game code-displayed on the game page, but also need to pass this into the useSocket hook
// show host's name - now shows in the top left
// card functionality? i believe seth will be taking care of most of this
// choose which cards to discard on your turn?
// set up a spot for chat to be implemented
// set up spot for cards and players (middle of page)
// show whos turn it currently is
// need to map through the players array that is given by Seth

function GamePage() {
  const { isHost, user } = useContext(UserContext);
  const { deck, cardsDealt, players, isActive, isTurn, createDeck } =
    useContext(GameContext);
  const gameCode = window.location.href.slice(-6);
  return (
    <>
      <div>
        <br />
        <div>
          Join code for this game:
          {gameCode}
        </div>
        <br />
        {/* the following line is having issues with the isHost, that may not be done correctly in the userContext */}
        <div>Hosted By:{isHost}</div>
        <br />
        <Button
          variant="contained"
          onClick={() => {
            createDeck();
          }}
        >
          Shuffle Deck, Start Game
        </Button>
      </div>
    </>
  );
}

export default GamePage;
