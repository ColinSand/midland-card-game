// this context will handle all of the poker game that is stored in state.
// probably quite a bit

// the sockets will sort of share state, but the state will be passed through the sockets
// essentially the

// each player will technically be informed of who all got what cards, those cards will be hidden (face down) unless
// you are the player who recieved those cards, those will be face up so you can see them

import React from "react";

export default function GameContext(props) {
  return <GameContext.Provider></GameContext.Provider>;
}
