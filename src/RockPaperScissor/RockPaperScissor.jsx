import React, { useEffect, useState } from "react";
import "./rockpaperscissor.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import NamePopUp from "../name_pop";
import { useSelector } from "react-redux";
import { URL } from "../utils/constants";
import axios from "axios";

function RockPaperScissor() {
  const options = ["Rock", "Paper", "Scissor"];
  const [playermove, setPlayerMove] = useState("");
  const [compmove, setCompMove] = useState("");
  const [winner, setWinner] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [win, setWin] = useState(0);
  const [lose, setLose] = useState(0);
  const [draw, setDraw] = useState(0);
  const [round, setround] = useState([]);
  const [finalWinner, setFinalWinner] = useState("");
  const [score, setscore] = useState(0);
  const location = useLocation();
  const [modalShow, setModalShow] = React.useState(true);
  const { user, nameEntered, id } = useSelector((state) => state.user);

  let navigate = useNavigate();

  const handleClose1 = () => {
    InsertScore();
    setShow1(false);
    navigate('/leaderboard',{
      state:{
        id:location.state.id
      }
    })
    setround([]);
    setWin(0);
    setLose(0);
    setDraw(0);
  };

  const resetBoard = () => {
    setround([]);
    setWin(0);
    setLose(0);
    setDraw(0);
  };

  const handleShow = () => setShow(true);
  const playRound = (playerChoice) => {
    const computerChoice = options[Math.floor(Math.random() * options.length)];
    setPlayerMove(playerChoice);
    setCompMove(computerChoice);
    determineWinner(playerChoice, computerChoice);
    handleShow();
  };
  const determineWinner = (player, computer) => {
    if (player === computer) {
      setWinner("draw");
      setDraw((prevDraw) => prevDraw + 1);
    } else if (
      (player === "Rock" && computer === "Scissor") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissor" && computer === "Paper")
    ) {
      setround([...round, player]);
      setWinner("win");
      setscore(score + 10);
      setWin((prevWin) => prevWin + 1);
    } else {
      setWinner("lost");
      setscore(score - 10);
      setLose((prevLose) => prevLose + 1);
      setround([...round, computer]);
    }

    if (round.length === 5) {
      setTimeout(() => {
        if (win > lose) {
          setFinalWinner("Congratulations! You won the game! 🎉");
        } else if (lose > win) {
          setFinalWinner("Computer Wins the Game! Better Luck Next Time 😔");
        } else {
          setFinalWinner("It's an Overall Draw! 🤝");
        }
        setShow1(true);
      }, 500);
    }
  };

  useEffect(() => {
    setModalShow(!nameEntered);
  }, [nameEntered]);

  const InsertScore = async () => {
    console.log("Hello");
    try {
      const url = URL + "leaderboard";
      const res = await axios({
        method: "post",
        url: url,
        data: {
          score: score,
          gameId: location.state.id,
          userId: id,
        },
      });
      if (res.data.status === "success") {
        console.log(res.data, "Data");
      }
    } catch (error) {
      console.log(error, "Error");
    }
  };

  useEffect(() => {
    console.log(location.state, "State");
  });

  return (
    <>
     <h3 className="ajdhgwa">Welcome {user}!</h3>
      <div className="sdfbs">
        <div className="mycontainer">
          <h3 className="text-light m-0">Score : {score}</h3>

          <h1>Rock - Paper - Scissor</h1>
          <h4 className="choose">Choose any move</h4>
          <div className="buttons">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => playRound(option)}
                className="wbtn"
              >
                {option === "Rock" ? "✊" : option === "Paper" ? "🖐️" : "✌️"}
              </button>
            ))}
          </div>

          <p>Remain Chance :{6 - round.length} / 6</p>

          <Modal show={show1} onHide={handleClose1}>
            <Modal.Header closeButton>
              <Modal.Title> {finalWinner}</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Thank You
              </Button>
            </Modal.Footer>
          </Modal>

          <div>
            <button
              className="rpcReloadbtn"
              onClick={() =>
                navigate("/leaderboard", {
                  state: {
                    id: location.state.id,
                  },
                })
              }
            >
              View Score
            </button>

            <a href={"/"}>
              <button className="rpcReloadbtn">Back to Home</button>
            </a>
          </div>

          <p className="result">
            Won = {win} || Lost = {lose} || Draw = {draw}
          </p>

          {(playermove || compmove) && (
            <p className="fs-6 fw-light">
              You Picked Up <span className="fw-bold">{playermove}</span> And
              Computer Picked Up <span className="fw-bold">{compmove}</span>
            </p>
          )}
          {!!winner && winner === "win" && (
            <div className="result rounded w-80 d-inline green">You WON!</div>
          )}
          {!!winner && winner === "lost" && (
            <div className="result rounded w-80 d-inline red">You LOST!</div>
          )}
          {!!winner && winner === "draw" && (
            <div className="result rounded w-80 d-inline gray">
              It's a DRAW!
            </div>
          )}
        </div>
      </div>
      <NamePopUp show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default RockPaperScissor;
