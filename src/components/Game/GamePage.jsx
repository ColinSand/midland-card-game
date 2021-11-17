import React from "react";
import { useContext } from "react";
import { GameContext } from "../../shared/context/GameContext";
import Button from "@mui/material/Button";

// here we go
// nate's chat will be shown on the left side, towards the bottom
// need to show the game number, hosted by ${host} with a deal/start button that only the host can see.

// top right will have the name of the player who's turn it currently is

// the center of this page should have all of the usernames with their cards (face down)
// your cards face up with the draw and stay buttons, then check up to 3 boxes to select cards to draw/replace.
// most of the card functionality will come from seth

function GamePage() {
  const {
    deck,
    cardsDealt,
    players,
    isActive,
    isHost,
    isTurn,
    createDeck,
    shuffleDeck,
    dealCards,
  } = useContext(GameContext);

  return (
    <>
      <div>
        <br></br>
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
