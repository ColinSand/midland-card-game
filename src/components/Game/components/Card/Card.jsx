import React from "react";
import "./Card.css";

const Card = ({ face, suit, showCard }) => {
  return (
    <>
      {showCard && (
        <div className="card-surround">
          <div className="top-left">{suit}</div>
          <br />
          <div className="card-value">{face}</div>
          <div className="bottom-right">{suit}</div>
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
