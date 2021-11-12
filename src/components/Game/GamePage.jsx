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
    <>
      <div>
        <button
          onClick={() => {
            createDeck();
          }}
        >
          Create Deck
        </button>
        <button
          onClick={() => {
            shuffleDeck();
            console.log(deck);
          }}
        >
          Shuffle Deck
        </button>
      </div>
    </>
  );
}

export default GamePage;
