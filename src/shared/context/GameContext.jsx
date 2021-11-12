// this context will handle all of the poker game that is stored in state.
// probably quite a bit

// the sockets will sort of share state, but the state will be passed through the sockets
// essentially the

// each player will technically be informed of who all got what cards, those cards will be hidden (face down) unless
// you are the player who recieved those cards, those will be face up so you can see them

// need to know whow the players are , what their cards are
// how many cards they get, how to swap cards
// sockets are going to trigger this functionaility
// need to know which player needs what
// staying will emit (sockets) for myself

// in a lot of ways these functions will sort of b

// need to get all of the functionality on the user side:
//     - Join Room
//     - Deal Card
//     - Fold
//     - Stay
//     - Start Game
//     - Game Over
//     - Leave Room
//     - Close Room

import React, { useState, useCallback } from "react";
export const GameContext = React.createContext(null);

export function GameContext(props) {
  const [deck, setDeck] = useState([]);
  // the cardsDealt array should be an array of objects, have the usernames of each player, then the individual cards
  const [cardsDealt, setCardsDealt] = useState([]);
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [isActive, setIsActice] = useState(false);
  const [isTurn, setIsTurn] = useState(false);

  let cardSuits = ["diamonds", "spades", "hearts", "clubs"];
  let cardValues = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  function createDeck() {
    let newDeck = new Array();
    for (let i = 0; i < cardSuits.length; i++) {
      for (let x = 0; x < cardValues.length; x++) {
        let card = { Value: cardSuits[x], Suit: cardSuits[i] };
        newDeck.push(card);
      }
    }
    setDeck(newDeck);
    return newDeck;
  }

  const shuffleDeck = useCallback(
    async (deck) => {
      for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor(Math.random() * deck.length);
        let location2 = Math.floor(Math.random() * deck.length);
        let tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
      }
    },
    [deck]
  );

  createDeck();
  shuffleDeck();
  console.log(deck);
  return <GameContext.Provider></GameContext.Provider>;
}
