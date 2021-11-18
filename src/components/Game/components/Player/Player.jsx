//Need to render logic for keeping cards on turn//
//Need to be able to keep 2-5 cards based on player selection and trigger draw function from socket
//Need to pull in Card from card component
//Map through player.deck and render cards
//Display card face or back dependent upon user
//Display card selector boxes and draw/stay buttons dependent upon isTurn

//Checked boxes need to update state "discard" (add to array) and deselecting needs to
//remove from "discard" array.

//Need to prevent adding more than 3 cards to "discard" array/selecting more that 3 cards

import React, { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import { UserContext } from "../../../../shared/context/UserContext";
import { GameContext } from "../../../../shared/context/GameContext";
import "./Player.css";
import { Button } from "@mui/material";

function Player({ drawCards, player, playerIdx }) {
  const { user } = useContext(UserContext);
  const { isTurn, gameActive } = useContext(GameContext);
  const [keepCards, setKeepCards] = useState([...player.deck]);
  useEffect(() => {
    setKeepCards([...player.deck]);
  }, [player]);
  return (
    <>
      <div className="player-container">
        <>
          <div>{player.username}</div>
          <div className="card-container">
            {player.deck.map((card, idx) => (
              <div
                key={idx}
                style={{
                  border: `1px solid ${
                    !keepCards.includes(card) ? "red" : "green"
                  }`,
                }}
                onClick={() => {
                  const kept = keepCards.includes(card);
                  if (isTurn !== playerIdx || (kept && keepCards.length < 3))
                    return;
                  if (kept) {
                    setKeepCards((curr) => curr.filter((v) => v !== card));
                  } else {
                    setKeepCards((curr) => [...curr, card]);
                  }
                }}
              >
                <Card
                  key={idx}
                  face={card.value}
                  suit={card.suit}
                  showCard={player.username === user.username || !gameActive}
                />
              </div>
            ))}
            {isTurn === playerIdx && player.username === user.username && (
              <>
                <div>Select cards to discard</div>
                <Button
                  onClick={() => {
                    drawCards(playerIdx, [...keepCards]);
                  }}
                >
                  {keepCards.length === 5 ? "Stay" : "Draw"}
                </Button>
              </>
            )}
          </div>

          {/* What to do with this button??? Needs to trigger draw function in socket */}
          {/* <Button onClick={()=> setKeepCards(keepCards), draw()}></Button> */}
        </>
      </div>
    </>
  );
}

export default Player;
