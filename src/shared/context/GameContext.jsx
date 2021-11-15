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
//     - Join Room -already handled by Seth in the home page with the URL
//     - Deal Card
//     - Fold
//     - Stay
//     - Start Game
//     - Game Over
//     - Leave Room
//     - Close Room

import React, { useState, useCallback } from "react";
export const GameContext = React.createContext(null);

export function GameProvider(props) {
  const [deck, setDeck] = useState([]);
  // the cardsDealt array should be an array of objects, have the usernames of each player, then the individual cards
  const [cardsDealt, setCardsDealt] = useState([]);
  const [players, setPlayers] = useState([]);
  const [gameActive, setGameActice] = useState(false);
  const [isTurn, setIsTurn] = useState(false);

  //"player" is an object consisting of two keys-- 'username'(provided when they join a room)
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

  const dealOneCard = useCallback((playerIndex) => {
    let newDeck = [...deck];
    let dealtPlayers = [...players];
    let dealtCards = newDeck.shift();
    dealtPlayers[playerIndex].hand = [
      ...dealtPlayers[playerIndex].hand,
      dealtCards,
    ];
    setPlayers(dealtPlayers);
    setDeck(newDeck);
  }, []);

  const startGameDeal = useCallback(() => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < players.length; j++) {
        dealOneCard(i);
      }
    }
  });

  //Need something to go to 5 cards
  //Identify player in the players array?
  //How to know how many cards
  // const draw = useCallback((players) => {
  //   let newDeck = [...deck];
  //   let newPlayerHand = [...players[i].hand].filter((cards) => );
  // newPlayerHand.filter((cards) => card !== cards)
  // if (newPlayerHand.length < 5)
  //   for (let i = 0; i < 5; i++) {
  //     dealOneCard();
  //   }

  // setDeck(newDeck);
  //   let newPlayerHand = [...players[i].hand];
  //   if (newPlayerHand.length < 5)
  //     for (let i = 0; i < 5; i++) {
  //       dealOneCard();
  //     }

  //   setDeck(newDeck);
  // });

  //Whose turn is it???/ if it is player's turn, pass play to next player in players array???
  //How to move on to next player???
  const leaveGame = useCallback((username) => {
    const newPlayersArray = players.filter(
      (player) => username !== player.username
    );

    setPlayers(newPlayersArray);

    console.log(newPlayersArray);
  });

  const gameEnds = useCallback(() => {
    if ((gameActive = false)) {
      // show everyone's cards, then
    }
  });

  // we need to know how many players have joined the lobby.
  const trackPlayers = useCallback((player) => {}, []);
  return (
    <GameContext.Provider
      value={{
        deck,
        cardsDealt,
        players,
        gameActive,
        isHost,
        isTurn,
        createDeck,
        shuffleDeck,
        dealCards,
        startGameDeal,
        dealOneCard,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
