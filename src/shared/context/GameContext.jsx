// each player will technically be informed of who all got what cards, those cards will be hidden (face down) unless
// you are the player who recieved those cards, those will be face up so you can see them

// need to know who the players are , what their cards are (using the "players" array)
// how many cards they get, how to swap cards (using the startGameDeal function and the deal function)
// need to know which player needs what (should be with the index of the player in the "players" array)

// need to get all of the functionality on the user side:
//     - Join Room -already handled by Seth in the home page with the URL
//     - Deal Card-startGameDeal and the deal functions
//     - Fold - this will be for later (MMP)
//     - Stay - just not selecting any cards for exchange
//     - Start Game - when startGameDeal is run
//     - Game Over - when all players have taken a turn
//     - Leave Room - when a player disconnects, we may add a button for this
//     - Close Room - MMP

import React, { useState, useCallback, useMemo } from "react";
export const GameContext = React.createContext(null);

export function GameProvider(props) {
  const [deck, setDeck] = useState([]);
  // the cardsDealt array should be an array of objects, have the usernames of each player, then the individual cards
  const [players, setPlayers] = useState([]);
  const [isTurn, setIsTurn] = useState(null);
  const gameActive = useMemo(() => isTurn !== null, [isTurn]);

  // "player" is an object consisting of two keys-- 'username'(provided when they join a room)
  // and a 'hand'(consisting of an array of 5 cards defined upon 'startGameDeal' function and updated
  // when they trigger 'draw' function)

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
        let card = { Value: cardValues[x], Suit: cardSuits[i] };
        newDeck.push(card);
      }
    }
    shuffleDeck(newDeck);
  }

  const shuffleDeck = useCallback(
    (deck) => {
      for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor(Math.random() * deck.length);
        let location2 = Math.floor(Math.random() * deck.length);
        let tmp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = tmp;
      }
      console.log(deck);
      startGameDeal(deck);
    },
    [deck]
  );

  const startGameDeal = useCallback(
    (deck) => {
      let newPlayers = [...players];
      let newDeck = [...deck];
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < players.length; j++) {
          newPlayers[i].deck = [...newPlayers[i].deck, newDeck.shift()];
        }
      }
      return { players: newPlayers, deck: newDeck, isTurn: 0 };
    },
    [players, deck]
  );

  const draw = useCallback(
    (playerIdx, keptCards) => {
      let newPlayers = [...players];
      let newDeck = [...deck];
      let newIsTurn = isTurn;
      newPlayers[playerIdx].deck = [keptCards];
      while (newPlayers[playerIdx].deck.length < 5) {
        newPlayers[playerIdx].deck = [
          ...newPlayers[playerIdx].deck,
          newDeck.shift(),
        ];
      }
      // the following if may need to be reworked.  What happens at the end of the last player's turn?
      if (isTurn < players.length - 1) {
        newIsTurn++;
      } else {
        newIsTurn = null;
      }
      return { players: newPlayers, deck: newDeck, isTurn: newIsTurn };
    },
    [players, deck]
  );

  //Whose turn is it???/ if it is player's turn, pass play to next player in players array???
  //How to move on to next player???
  const leaveGame = useCallback((username) => {
    let i = players.findIndex(username);

    if (i <= isTurn) {
      setIsTurn((curr) => curr - 1);
    } else {
      const newPlayersArray = players.filter(
        (player) => username !== player.username
      );
      setPlayers(newPlayersArray);
      console.log(newPlayersArray);
    }
  }, []);

  return (
    <GameContext.Provider
      value={{
        deck,
        players,
        gameActive,
        isTurn,
        setDeck,
        createDeck,
        shuffleDeck,
        startGameDeal,
        draw,
        leaveGame,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
