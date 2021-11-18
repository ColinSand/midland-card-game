import React from "react";
import "./Card.css";
import c from "./icons/club.svg";
import d from "./icons/diamond.svg";
import h from "./icons/heart.svg";
import s from "./icons/spade.svg";

const Card = ({ face, suit, showCard, toKeep }) => {
  const suitIcons = {
    c,
    d,
    h,
    s,
  };
  return (
    <>
      {showCard && (
        <div className={`card-surround card-${toKeep ? "keep" : "discard"}`}>
          <img className="suit top-left" src={suitIcons[suit]} />
          <div className="card-value">{face}</div>
          <img className="suit bottom-right" src={suitIcons[suit]} />
        </div>
      )}
      {!showCard && (
        <div className="card-surround">
          <div className="card-back"></div>
        </div>
      )}
    </>
  );
};

export default Card;
