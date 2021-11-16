import React from "react";
import "./Card.css";

const Card = (cardSuits, cardValues) => {
  return (
    <>
      <div className="card-container">
        <div className="card-flex">{cardSuits.value}</div>
        <div className="card-flex card-value">{cardValues.value}</div>
        <div className="card-flex bottom-right">{cardSuits.value}</div>
      </div>
    </>
  );
};

export default Card;
