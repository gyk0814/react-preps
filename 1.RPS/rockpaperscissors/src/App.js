import "./App.css";

import { useState, useEffect } from "react";
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
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [winStreak, setWinStreak] = useState(0);
  const [maxWinStreak, setMaxWinStreak] = useState(0);
  const [message, setMessage] = useState(""); // 메시지 상태 추가

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
      setUserScore(userScore + 1);
      setWinStreak(winStreak + 1);
      if (winStreak + 1 > maxWinStreak) {
        setMaxWinStreak(winStreak + 1);
      }
      return "win";
    } else {
      setWinStreak(0);
      setCompScore(compScore + 1);
      return "lose";
    }
  };

  useEffect(() => {
    if (maxWinStreak > 0) {
      setMessage(`🎉최고 기록: 연속 ${maxWinStreak}번 승리!🎉`);
    }
    const timeout = setTimeout(() => {
      setMessage("");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [maxWinStreak]);

  return (
    <div className="container">
      <div className="title">
        <h1>🎲 연승 가위바위보 게임 🎲</h1>
      </div>
      <h2>{message || `최고 기록: 연속 ${maxWinStreak}번 승리!`}</h2>
      <h3>현재 연속 {winStreak}번 승리!</h3>
      <div className="main">
        <Box title="user" item={userChoice} result={result} score={userScore} />
        <Box
          title="computer"
          item={computerChoice}
          result={result}
          score={compScore}
        />
      </div>

      <div className="buttons">
        <button className="btn" onClick={() => play("scissors")}>
          가위✌️
        </button>
        <button className="btn" onClick={() => play("rock")}>
          바위✊
        </button>
        <button className="btn" onClick={() => play("paper")}>
          보🖐️
        </button>
      </div>
    </div>
  );
}

export default App;
