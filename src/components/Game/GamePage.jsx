import React from "react";
import { useContext } from "react";
import { GameContext } from "../../shared/context/GameContext";

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
  } = useContext(GameContext);

  return (
    <div>
      <button
        onClick={() => {
          createDeck();
          shuffleDeck();
          console.log(deck);
        }}
      >
        Do Something
      </button>
    </div>
  );
}

export default GamePage;
