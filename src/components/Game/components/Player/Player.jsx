//Need to render logic for keeping cards on turn//
//Need to be able to keep 2-5 cards based on player selection and trigger draw function from socket
//Need to pull in Card from card component
//Map through player.hand and render cards
//Display card face or back dependent upon user
//Display card selector boxes and draw/stay buttons dependent upon isTurn

import React, { useContext, useState } from "react";
import Card from "../Card/Card";
import { UserContext } from "../../../../shared/context/UserContext";
import { GameContext } from "../../../../shared/context/GameContext";

function Player({ draw, player }) {
  const { username } = useContext(UserContext);
  const { isTurn, gameActive } = useContext(GameContext);
  const [drawCards, setDrawCards] = useState({});

  return <div></div>;
}

export default Player;
