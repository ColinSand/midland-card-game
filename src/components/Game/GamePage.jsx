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
// display game code-done
// show host's name
// card functionality?
// choose which cards to discard on your turn?
// set up a spot for chat to be implemented
// show whos turn it currently is
//

function GamePage() {
  const { isHost } = useContext(UserContext);

  const {
    deck,
    cardsDealt,
    players,
    isActive,

    isTurn,
    createDeck,
    shuffleDeck,
    dealCards,
  } = useContext(GameContext);
  console.log(window.location.href);
  return (
    <>
      <div>
        <br></br>
        <div>
          Join code for this game:
          {window.location.href.slice(-6)}
        </div>
        {/* the following line is having issues with the isHost, that may not be done correctly in the userContext */}
        {/* <div>Hosted By:{isHost}</div> */}
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
