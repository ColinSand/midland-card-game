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

import React, { useState, useCallback } from "react";
export const GameContext = React.createContext(null);

export function GameProvider(props) {
  const [deck, setDeck] = useState([]);
  // the cardsDealt array should be an array of objects, have the usernames of each player, then the individual cards
  const [players, setPlayers] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [isTurn, setIsTurn] = useState(null);

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
      setDeck(deck);
    },
    [deck]
  );

  const startGameDeal = useCallback(() => {
    let newPlayers = [...players];
    let newDeck = [...deck];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < players.length; j++) {
        newPlayers[i].deck = [...newPlayers[i].deck, newDeck.shift()];
      }
    }
    setIsTurn(0);
    setDeck(newDeck);
    setPlayers(newPlayers);
    return { player: newPlayers, deck: newDeck };
  }, [players, deck]);

  const draw = useCallback(
    (playerIdx, keptCards) => {
      let newPlayers = [...players];
      let newDeck = [...deck];
      newPlayers[playerIdx].deck = [keptCards];
      while (newPlayers[playerIdx].deck.length < 5) {
        newPlayers[playerIdx].deck = [
          ...newPlayers[playerIdx].deck,
          newDeck.shift(),
        ];
      }
      // the following if may need to be reworked.  What happens at the end of the last player's turn?
      if (isTurn < players.length - 1) {
        setIsTurn(curr + 1);
      }
      setDeck(newDeck);
      setPlayers(newPlayers);
      return { player: newPlayers, deck: newDeck };
    },
    [players, deck]
  );

  // as soon as you deal, set the player index to 0
  const changingTurns = useCallback(() => {
    for (let i = 0; i < players.length; i++) {
      const element = array[i];
    }
    setIsTurn();
  });

  //Whose turn is it???/ if it is player's turn, pass play to next player in players array???
  //How to move on to next player???
  const leaveGame = useCallback((username) => {
    if (players[i] === isTurn) {
      setIsTurn(curr + 1);
    } else {
      const newPlayersArray = players.filter(
        (player) => username !== player.username
      );
      setPlayers(newPlayersArray);
      console.log(newPlayersArray);
    }
  });

  const gameEnds = useCallback(() => {
    if ((gameActive = false)) {
      // show everyone's cards, then let the host use the shuffle and startGameDeal
    }
  });

  return (
    <GameContext.Provider
      value={{
        deck,
        players,
        gameActive,
        isTurn,
        createDeck,
        shuffleDeck,
        dealCards,
        startGameDeal,
        dealOneCard,
        draw,
        leaveGame,
        gameEnds,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
