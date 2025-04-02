import React from "react";
import questionMark from "../img/the-question-mark.webp";

const Box = (props) => {
  let result;
  if (
    props.title === "computer" &&
    props.result !== "draw" &&
    props.result !== null
  ) {
    result = props.result === "win" ? "lose" : "win";
  } else {
    result = props.result;
  }

  return (
    <div>
      <div className={`box ${result}`}>
        <h1>{props.title}</h1>
        <img
          className={`img ${!props.item ? "question-mark" : ""}`}
          src={props.item ? props.item.img : questionMark}
          alt={props.item && props.item.name}
        />
        <h2>{result}</h2>
      </div>
      <h3 className="score">score: {props.score}</h3>
    </div>
  );
};

export default Box;
