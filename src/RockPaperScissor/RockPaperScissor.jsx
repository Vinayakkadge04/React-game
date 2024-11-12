import React, { useEffect, useState } from "react";
import "./rockpaperscissor.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
  const [round , setround] = useState([]);
  const [finalWinner, setFinalWinner] = useState("");

  const handleClose = () => setShow(false);
  const handleClose1 = () => {setShow1(false); setround([]);
    setWin(0);
    setLose(0);
    setDraw(0);}
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
      setWinner("Match Draw");
      setDraw((prevDraw) => prevDraw + 1);
    } else if (
      (player === "Rock" && computer === "Scissor") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissor" && computer === "Paper")
    ) {
      setround([...round , player]);
      setWinner("You Won the Match! 🥳");
      setWin((prevWin) => prevWin + 1);
    } else {
      setWinner("You Lost the Match 😔");
      setLose((prevLose) => prevLose + 1);
      setround([...round , computer]);
    }


    if(round.length === 5){
      setTimeout(() => {
        if (win > lose) {
          setFinalWinner("Congratulations! You are the Overall Winner! 🎉");
        } else if (lose > win) {
          setFinalWinner("Computer Wins the Game! Better Luck Next Time 😔");
        } else {
          setFinalWinner("It's an Overall Draw! 🤝");
        }
        setShow1(true);

      }, 500);
    }

  };


  return (
    <>
      <div className="mycontainer">
        <div id="main">
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

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{winner}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You chose <span className="move">{playermove}</span> & Computer chose <span className="move">{compmove}</span>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Next Turn
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={show1} onHide={handleClose1}>
            <Modal.Header closeButton>
              <Modal.Title>  {finalWinner}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Thank You
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
        <p className="result">Won = {win} || Lost = {lose} || Draw = {draw}</p>
      </div>
    </>
  );
}

export default RockPaperScissor;
