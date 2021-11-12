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
    dealCards,
  } = useContext(GameContext);

  return (
    <>
      <div>
        <button
          onClick={() => {
            createDeck();
          }}
        >
          Shuffle Deck
        </button>
        <button
          onClick={() => {
            dealCards();
          }}
        ></button>
      </div>
    </>
  );
}

export default GamePage;
