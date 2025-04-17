import React, { useState } from "react";
import "./App.css";
import Popup from "./Popup";
let startPlayer = Math.floor(Math.random() * 2);
let currentFlag;
if (startPlayer) currentFlag = "X";
else currentFlag = "O";

const winPairs = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  let [status, Setstatus] = useState("");
  let [winIndex, setWin] = useState(false);
  let [log, setLog] = useState([]);
  let [currentPlayer, setCurrentPlayer] = useState(currentFlag);
  let [buttons, setButtons] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const checkStatus = (currentBoard) => {
    for (let [i, j, k] of winPairs) {
      if (
        currentBoard[i] === currentBoard[j] &&
        currentBoard[i] === currentBoard[k]
      )
        return [i, j, k];
    }
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] !== "X" && currentBoard[i] !== "O") {
        return false;
      }
    }
    return true;
  };
  const inputHandler = (pressedVal) => {
    let newButtons = [...buttons];
    if (
      newButtons[pressedVal - 1] !== "X" &&
      newButtons[pressedVal - 1] !== "O"
    ) {
      newButtons[pressedVal - 1] = currentPlayer;
      setButtons(newButtons);
      let temp = {
        player: currentPlayer,
        move: pressedVal,
      };
      log.push(temp);
      setLog(log);
      const status = checkStatus(newButtons);
      if (status == true) Setstatus("Draw");
      else if (status != false) {
        setWin(status);
        Setstatus(`${newButtons[status[0]]} Wins`);
      }
      let newPlayer = currentPlayer == "X" ? "O" : "X";
      setCurrentPlayer(newPlayer);
    }
  };
  return (
    <div className="container">
      <div className="left">
        <div className="playerarea">
          <div className="playerbtns">
            <button
              className={
                currentFlag == "X"
                  ? currentPlayer == "X"
                    ? "leftplayer primary current"
                    : "leftplayer primary"
                  : currentPlayer == "X"
                  ? "leftplayer secondary current"
                  : "leftplayer secondary"
              }
            >
              X
            </button>
            <button
              className={
                currentFlag == "O"
                  ? currentPlayer == "O"
                    ? "rightplayer primary current"
                    : "rightplayer primary"
                  : currentPlayer == "O"
                  ? "rightplayer secondary current"
                  : "rightplayer secondary"
              }
            >
              O
            </button>
          </div>
          <div className="btn-holder">
            {buttons.map((item, index) => (
              <button
                key={index}
                className={
                  winIndex != false
                    ? winIndex.indexOf(index) != -1
                      ? "winbutton"
                      : item === currentFlag
                      ? "primary-btn"
                      : item !== "O" && item !== "X"
                      ? "inputbutton"
                      : "secondary-btn"
                    : item === currentFlag
                    ? "primary-btn"
                    : item !== "O" && item !== "X"
                    ? "inputbutton"
                    : "secondary-btn"
                }
                onClick={() => inputHandler(index + 1)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="right">
        <span className="move-heading">
          Moves Of Each Player
        </span>
        <ul className="logarea">
          {log.map((item, index) => (
            <li key={index} className="logtxt">
              {item.player} Plays {item.move}
            </li>
          ))}
        </ul>
      </div>
      <div className = {status == false ? "hide" : "resetarea"}>
        <Popup data={status}/>
      </div>
    </div>
  );
}
export default App;
