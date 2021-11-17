import React from "react";
import "./Card.css";

const Card = ({ face, suit, showCard }) => {
  return (
    <>
      {showCard && (
        <div className="card-container">
          <div className="card-flex">{suit}</div>
          <div className="card-flex card-value">{face}</div>
          <div className="card-flex bottom-right">{suit}</div>
        </div>
      )}
      {!showCard && (
        <div className="card-container">
          <div className="card-back"></div>
        </div>
      )}
    </>
  );
};

export default Card;
