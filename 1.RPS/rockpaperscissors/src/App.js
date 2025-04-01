import "./App.css";

import { useState } from "react";
import Box from "./component/Box";
import rock from "./img/rock.png";
import paper from "./img/paper.png";
import scissors from "./img/scissors.png";

const choices = {
  rock: { name: "rock", img: rock },
  paper: { name: "paper", img: paper },
  scissors: { name: "scissors", img: scissors },
};

function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const play = (user) => {
    setUserChoice(choices[user]);

    let computer = Object.keys(choices)[Math.floor(Math.random() * 3)];
    setComputerChoice(choices[computer]);
    setResult(isWinner(choices[user].name, choices[computer].name));
  };
  const isWinner = (user, computer) => {
    console.log(user, computer);
    if (user === computer) {
      return "draw";
    } else if (
      (user === "rock" && computer === "scissors") ||
      (user === "scissors" && computer === "paper") ||
      (user === "paper" && computer === "rock")
    ) {
      return "win";
    } else {
      return "lose";
    }
  };

  return (
    <div>
      <div className="title">
        <h1>🎲 가위바위보 게임 🎲</h1>
      </div>
      <div className="main">
        <Box title="user" item={userChoice} result={result} />
        <Box title="computer" item={computerChoice} result={result} />
      </div>
      <div className="main">
        <button className="btn" onClick={() => play("scissors")}>
          가위
        </button>
        <button className="btn" onClick={() => play("rock")}>
          바위
        </button>
        <button className="btn" onClick={() => play("paper")}>
          보
        </button>
      </div>
    </div>
  );
}

export default App;
