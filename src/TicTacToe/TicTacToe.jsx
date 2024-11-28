import Board from "./component/Board";
import Square from "./component/Square";
import "./tictactoe.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate , useLocation } from "react-router-dom";
import NamePopUp from "../name_pop";
import { useSelector } from "react-redux";
import { URL } from "../utils/constants";
import axios from "axios";


const defaultSquares = () => new Array(9).fill(null);
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function TicTacToe() {
  let navigate = useNavigate();
  const [squares, setSquares] = useState(defaultSquares());
  const [winner, setWinner] = useState(null);
  const [winsLossesDraws, setwinsLossesDraws] = useState({
    wins: 0,
    losses: 0,
    draws: 0,
  });
  const [score , setscore] = useState(0);
  const [round, setRound] = useState(6);
  const [end, setEnd] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [overwinner, setOverWinner] = useState("");
  const location = useLocation();
  const [modalShow, setModalShow] = React.useState(true);

  const {user,nameEntered,id} = useSelector((state)=>state.user)


  let isPlayerWon = false;
  useEffect(() => {
    const linesThatAre = (a, b, c) => {
      return lines.filter((squareIndexes) => {
        const squareValues = squareIndexes.map((index) => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };
    const emptyIndexes = squares
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null);
    const playerWon = linesThatAre("x", "x", "x").length > 0;
    const computerWon = linesThatAre("o", "o", "o").length > 0;

    if (playerWon) {
      setWinner("x");
      setwinsLossesDraws((winsLossesDraws) => {
        setscore(score+10);
        return { ...winsLossesDraws, wins: winsLossesDraws.wins + 1 };
      });
      isPlayerWon = true;
    } else if (computerWon) {
      setWinner("o");
      setwinsLossesDraws((winsLossesDraws) => {
        setscore(score-10);
        return { ...winsLossesDraws, losses: winsLossesDraws.losses + 1 };
      });
    } else if (emptyIndexes.length === 1) {
      setWinner("draw");
      setwinsLossesDraws((winsLossesDraws) => {
        return { ...winsLossesDraws, draws: winsLossesDraws.draws + 1 };
      });
    }

    const putComputerAt = (index) => {
      setSquares((prevSquare) => {
        let newSquares = [...prevSquare];
        newSquares[index] = "o";
        return newSquares;
      });
    };

    const isComputerTurn =
      squares.filter((square) => square !== null).length % 2 === 1;
    if (isComputerTurn && isPlayerWon === false) {
      const winningLines = linesThatAre("o", "o", null);
      if (winningLines.length > 0) {
        const winIndex = winningLines[0].filter(
          (index) => squares[index] === null
        )[0];
        putComputerAt(winIndex);
        return;
      }

      const linesToBlock = linesThatAre("x", "x", null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(
          (index) => squares[index] === null
        )[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre("o", null, null);
      if (linesToContinue.length > 0) {
        putComputerAt(
          linesToContinue[0].filter((index) => squares[index] === null)[0]
        );
        return;
      }

      const randomIndex =
        emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
      if (emptyIndexes.length > 0) {
        putComputerAt(randomIndex);
      }
    }
  }, [squares]);

  function handleSquareClick(index) {
    if (end || squares[index] !== null || winner !== null) {
      return;
    }
    const isPlayerTurn =
      squares.filter((square) => square !== null).length % 2 === 0;
    if (isPlayerTurn && winner === null) {
      const newSquares = squares;
      newSquares[index] = "x";
      setSquares([...newSquares]);
    }
  }

  const resetBoard = () => {
    setRound(round - 1);
    setSquares(new Array(9).fill(null));
    setWinner(null);
  };

  useEffect(() => {
    console.log(round, "Round");
    if (round === 0) {
      setEnd(true);
      handleShow();
      InsertScore();
      navigate("/leaderboard", {
        state: {
          id: location.state.id,
        },
      })
      if (winsLossesDraws.wins > winsLossesDraws.losses) {
        setOverWinner("You Won");
      } else {
        setOverWinner("Computer Won");
      }
    }
  }, [round]);

  useEffect(() => {
    setModalShow(!nameEntered);
  }, [nameEntered]);

  const InsertScore = async() =>{
    console.log("Hello")
    try{
      const url = URL+'leaderboard'
      const res = await axios({
        method:"post",
        url:url,
        data:{
          "score":score,
          "gameId":location.state.id,
          "userId":id
        }
      });
      if(res.data.status === "success"){
        console.log(res.data,"Data");
        navigate('/leaderboard',{
          state:{
            id:location.state.id
          }
        })
      }
    }catch(error){
      console.log(error,"Error")
    }
  }

  useEffect(()=>{
    console.log(location.state,"State")
  })

  const reloadGame = () => {
  
    setSquares(defaultSquares()); 
    setWinner(null);
    setwinsLossesDraws({
      wins: 0,
      losses: 0,
      draws: 0,
    }); 
    setscore(0); 
    setRound(6); 
    setEnd(false);
    setOverWinner("");
    setShow(false); 
  };
  

  return (
    <>
      <div className="ticbody">
        <h3 className="ajdhgwa">Welcome {user}!</h3>
      <div className="navigation">
        <div className="button text-center">
            <button 
              onClick={()=>navigate('/leaderboard',{
                state:{
                  id:location.state.id
                }
              })}
            className="up m-2">View Score</button>
        
          <button
            className="left m-2"
            onClick={() => {
             reloadGame()
            }}
          >
            Reload Game
          </button>
          <br />
          <a href={"/"}>
            <button className="right m-2">Back to Home</button>
            <br />
          </a>
        </div>
      </div>

        <main className="ticmain">
          <h1>Tic Tac Toe</h1>
          <h5>Remain chance: {round}/6</h5>
          <h5>Score :{score}</h5>
          <Board>
            {squares.map((square, index) => (
              <Square
                x={square === "x" ? 1 : 0}
                o={square === "o" ? 1 : 0}
                onClick={() => handleSquareClick(index)}
              />
            ))}
          </Board>
          <h3>
            Wins: {winsLossesDraws.wins} Losses: {winsLossesDraws.losses} Draws:{" "}
            {winsLossesDraws.draws}
          </h3>
         
          {!!winner && winner === "x" && (
            <div className="result green">
              You WON!
              <button onClick={resetBoard}>Next Round</button>
            </div>
          )}
          {!!winner && winner === "o" && (
            <div className="result red">
              You LOST!
              <button onClick={resetBoard}>Next Round</button>
            </div>
          )}
          {!!winner && winner === "draw" && (
            <div className="result gray">
              It's a DRAW!
              <button onClick={resetBoard}>Next Round</button>
            </div>
          )}
        </main>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>{overwinner}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <NamePopUp  show={modalShow} onHide={() => setModalShow(false)}/>
    </>
  );
}

export default TicTacToe;
