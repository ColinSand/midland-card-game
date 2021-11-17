import React from "react";
import { useContext } from "react";
import { GameContext } from "../../shared/context/GameContext";
import Chat from "./components/Chat/Chat";

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
      <Chat />
    </>
  );
}

export default GamePage;
