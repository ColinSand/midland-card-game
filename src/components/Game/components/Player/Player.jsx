//Need to render logic for keeping cards on turn//
//Need to be able to keep 2-5 cards based on player selection and trigger draw function from socket
//Need to pull in Card from card component
//Map through player.deck and render cards
//Display card face or back dependent upon user
//Display card selector boxes and draw/stay buttons dependent upon isTurn

//Checked boxes need to update state "discard" (add to array) and deselecting needs to
//remove from "discard" array.

//Need to prevent adding more than 3 cards to "discard" array/selecting more that 3 cards

import React, { useContext, useEffect, useState, useMemo } from "react";
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

  const buttonMsg = useMemo(() => {
    if (keepCards.length === 5) {
      return "Stay";
    }
    return keepCards.length >= 2 ? "Draw" : "Deal Me In";
  }, [keepCards]);
  return (
    <>
      <div className="player-container">
        <>
          <div className="username">
            {player.username}
            {playerIdx === isTurn && "'s turn"}
          </div>
          <div className="card-container">
            {player.deck
              .sort((a, b) => a.points - b.points)
              .map((card, idx) => (
                <div
                  key={idx}
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
                    toKeep={keepCards.includes(card)}
                    face={card.value}
                    suit={card.suit}
                    showCard={player.username === user.username || !gameActive}
                  />
                </div>
              ))}
          </div>
          <div className="emptyDiv">
            {isTurn === playerIdx && player.username === user.username && (
              <>
                <div className="conditional">
                  &#8593; Select up to 3 cards to discard &#8593;
                </div>
                <Button
                  className="conditional"
                  sx={{
                    marginLeft: "15px",
                    color: "white",
                    bgcolor: "#1f2f53",
                    "&:hover": {
                      background: "#1f2f53ab",
                    },
                  }}
                  onClick={() => {
                    drawCards(playerIdx, [...keepCards]);
                  }}
                >
                  {buttonMsg}
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
