//Need to render logic for keeping cards on turn//
//Need to be able to keep 2-5 cards based on player selection and trigger draw function from socket
//Need to pull in Card from card component
//Map through player.hand and render cards
//Display card face or back dependent upon user
//Display card selector boxes and draw/stay buttons dependent upon isTurn

//Checked boxes need to update state "discard" (add to array) and deselecting needs to
//remove from "discard" array.

//Need to prevent adding more than 3 cards to "discard" array/selecting more that 3 cards

import React, { useContext, useState } from "react";
import Card from "../Card/Card";
import { UserContext } from "../../../../shared/context/UserContext";
import { GameContext } from "../../../../shared/context/GameContext";
import "./Player.css";
import { Button } from "@mui/material";

function Player({ drawCards, player, playerIdx }) {
  const { user } = useContext(UserContext);
  const { isTurn, gameActive } = useContext(GameContext);
  const [keepCards, setKeepCards] = useState([]);

  return (
    <>
      <div className="player-container">
        <>
          <div>{user.username}</div>
          <div className="card-container">
            {player.hand.map((card, idx) => (
              <>
                <label for="card">
                  <Card
                    key={idx}
                    face={card.value}
                    suit={card.suit}
                    showCard={player.username === user.username || !gameActive}
                  />
                </label>
                {isTurn === playerIdx && (
                  <input
                    type="checkbox"
                    id="card"
                    checked={keepCards.includes(card)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setKeepCards((curr) => [...curr, card]);
                      } else {
                        setKeepCards((curr) => curr.filter((v) => v !== card));
                      }
                    }}
                  />
                )}
              </>
            ))}
            {isTurn === playerIdx && (
              <>
                <div>Select cards to keep then click "DRAW" or "STAY"</div>
                <Button
                  onClick={() => {
                    drawCards([...keepCards]);
                    setKeepCards([]);
                  }}
                >
                  Draw
                </Button>
                <Button
                  onClick={() => {
                    drawCards([...player.hand]);
                    setKeepCards([]);
                  }}
                >
                  Stay
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
