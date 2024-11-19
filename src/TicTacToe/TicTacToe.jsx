import React, { useEffect, useState } from "react";
import "./tictactoe.css";
import { useNavigate } from "react-router-dom";

export default function TicTacToe() {
  let navigate = useNavigate();
  const [data, setdata] = useState(["", "", "", "", "", "", "", "", ""]);
  var [count, setcount] = useState(0);
  const [end, setEnd] = useState(false);
  const [random, setrandom] = useState();
  const [winner, setWinner] = useState("");

  const insertData = (num) => {
    if (end) {
      return null;
    }
    if (data[num] === "") {
      if (count % 2 === 1) {
        data[num] = "x";
        setcount(++count);
        checkWinng();
        setTimeout(() => {
          setRandomValue();
        }, 500);
      } else {
        data[num] = "o";
        setcount(++count);
        checkWinng();
      }
    }
    console.log(data);
  };

  const setRandomValue = () => {
  
      const ran = Math.floor(Math.random() * data.length);
      if (data[ran] === "") {
        setrandom(ran);
      } else {
        if (
          data[0] === "" ||
          data[1] === "" ||
          data[2] === "" ||
          data[3] === "" ||
          data[4] === "" ||
          data[5] === "" ||
          data[6] === "" ||
          data[7] === "" ||
          data[8] === ""
        ) {
          setRandomValue();
        } else return 0;
      }
    
  };

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (data[random] === "") {
      console.log("My", random, "Random Position");
      insertData(random);
    } else {
      setRandomValue();
    }
  }, [random]);

  const checkWinng = () => {
    console.log("hello");
    if (
      (data[2] !== "" && data[0] === data[1] && data[1] === data[2]) ||
      (data[8] !== "" && data[0] === data[4] && data[4] === data[8]) ||
      (data[6] !== "" && data[0] === data[3] && data[3] === data[6]) ||
      (data[7] !== "" && data[1] === data[4] && data[4] === data[7]) ||
      (data[5] !== "" && data[3] === data[4] && data[4] === data[5]) ||
      (data[8] !== "" && data[6] === data[7] && data[7] === data[8]) ||
      (data[6] !== "" && data[2] === data[4] && data[4] === data[6]) ||
      (data[8] !== "" && data[2] === data[5] && data[5] === data[8])
    ) {
      console.log("You Won");
      setEnd(true);
      (data[2] === "x" && data[0] === data[1] && data[1] === data[2]) ||
      (data[8] === "x" && data[0] === data[4] && data[4] === data[8]) ||
      (data[6] === "x" && data[0] === data[3] && data[3] === data[6]) ||
      (data[7] === "x" && data[1] === data[4] && data[4] === data[7]) ||
      (data[5] === "x" && data[3] === data[4] && data[4] === data[5]) ||
      (data[8] === "x" && data[6] === data[7] && data[7] === data[8]) ||
      (data[6] === "x" && data[2] === data[4] && data[4] === data[6]) ||
      (data[8] === "x" && data[2] === data[5] && data[5] === data[8])
        ? setWinner("x")
        : setWinner("o");
    } else if (!data.includes("") && winner === "") {
      setWinner("d");
      console.log("match Draw!!!");
    }
  };

  return (
    <>
      <div className="mycontainer1">
        <h1 className="title1">Tic Tac Toe</h1>
        
        <div className="main">
          <div className="grid">
            <div
              className="box"
              onClick={() => {
                insertData(0);
              }}
            >
              {data[0] === "x" ? "❌" : data[0] === "o" ? "⭕️" : ""}
            </div>
            <div
              className="box"
              onClick={() => {
                insertData(1);
              }}
            >
              {data[1] === "x" ? "❌" : data[1] === "o" ? "⭕️" : ""}
            </div>
            <div
              className="box"
              onClick={() => {
                insertData(2);
              }}
            >
              {data[2] === "x" ? "❌" : data[2] === "o" ? "⭕️" : ""}
            </div>
            <div
              className="box"
              onClick={() => {
                insertData(3);
              }}
            >
              {data[3] === "x" ? "❌" : data[3] === "o" ? "⭕️" : ""}
            </div>
            <div
              className="box"
              onClick={() => {
                insertData(4);
              }}
            >
              {data[4] === "x" ? "❌" : data[4] === "o" ? "⭕️" : ""}
            </div>
            <div
              className="box"
              onClick={() => {
                insertData(5);
              }}
            >
              {data[5] === "x" ? "❌" : data[5] === "o" ? "⭕️" : ""}
            </div>
            <div
              className="box"
              onClick={() => {
                insertData(6);
              }}
            >
              {data[6] === "x" ? "❌" : data[6] === "o" ? "⭕️" : ""}
            </div>
            <div
              className="box"
              onClick={() => {
                insertData(7);
              }}
            >
              {data[7] === "x" ? "❌" : data[7] === "o" ? "⭕️" : ""}
            </div>
            <div
              className="box"
              onClick={() => {
                insertData(8);
              }}
            >
              {data[8] === "x" ? "❌" : data[8] === "o" ? "⭕️" : ""}
            </div>
          </div>

          <div>
            {winner === "x" ? (
              <h1>You Won!!! 🏆</h1>
            ) : winner === "o" ? (
              <h1>Computer Won</h1>
            ) : winner === "d" ? (
              <h1>Match Draw</h1>
            ) : null}
          </div>
        </div>
        <div className="mybtn">
          <button className="reloadbtn" onClick={reloadPage}>
            Restart
          </button>

          <button className="reloadbtn" onClick={() => navigate(-1)}>
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}
