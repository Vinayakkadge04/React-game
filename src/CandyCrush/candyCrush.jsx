import React, { useEffect, useState, useRef } from "react";
import blueCandy from "../images/blue-candy.png";
import greenCandy from "../images/green-candy.png";
import orangeCandy from "../images/orange-candy.png";
import purpleCandy from "../images/purple-candy.png";
import redCandy from "../images/red-candy.png";
import yellowCandy from "../images/yellow-candy.png";
import blank from "../images/blank.png";
import "./candycrush.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import NamePopUp from "../name_pop";
import { useSelector } from "react-redux";
import { URL } from "../utils/constants";
import axios from "axios";
import Layout from "../Layout";

const width = 8;
const candyColors = [
  blueCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
  greenCandy,
];

function CandyCrush() {
  let navigate = useNavigate();
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [end, setEnd] = useState(false);
  const [show, setShow] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [modalShow, setModalShow] = React.useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();
  const { user, nameEntered, id } = useSelector((state) => state.user);
  const score = useRef(0)


  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        // setScoreDisplay((prev) => prev + 4);
        score.current = score.current + 4
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        // setScoreDisplay((prev) => prev + 4);
        score.current = score.current + 4
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        // setScoreDisplay((prev) => prev + 3);
        score.current = score.current + 3
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        // setScoreDisplay((prev) => prev + 3);
        score.current = score.current + 3
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };
  const dragStart = (e) => {
    console.log("Dragged square:", e.target); // Debugging line
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    console.log("Replaced square:", e.target); // Debugging line
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = () => {
    if (!squareBeingDragged || !squareBeingReplaced) {
      console.error("Dragged or Replaced square is null");
      return;
      
    }

    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);
    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);


  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setSec((prevSec) => {
          if (prevSec === 0) {
            setMin((prevMin) => {
              if (prevMin === 0) {
                InsertScore(); 
                clearInterval(timer);
                setIsTimerRunning(false);
                setEnd(true);
                setGameOver(true);
                navigate("/leaderboard", {
                  state: {
                    id: location.state.id,
                  },
                });
                return 0;
              }
              return prevMin - 1;
            });
            return 59;
          }
          return prevSec - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isTimerRunning]); 
  
  useEffect(() => {
    setModalShow(!nameEntered);
    setIsTimerRunning(true)
  }, [nameEntered]);

  console.log(score.current)



  const InsertScore = async () => {
    console.log("Insert Score function called...");
    console.log(score.current, "Score" , location.state.id ,"Game Id" , id , "UserId")
    try {
      const url = URL + "leaderboard";
      const res = await axios({
        method: "post",
        url: url,
        data: {
          score: score.current,
          gameId: location.state.id,
          userId: id,
        },
      });
      if (res.data.status === "success") {
        console.log(res.data, "Data");
      }
    } catch (error) {
      console.log(error, "Error");
      console.warn("Score not submitted, Please play again!");
    }
  };

  const resetGame = () => {
    // setScoreDisplay(0);
    score.current = 0
    setMin(1);
    setSec(0);
    setIsTimerRunning(true);
    setGameOver(false);
    setEnd(false);
  };


 

  return (
    <Layout>
      {" "}
      <div className="app row">
        <h2 className="ajdhgwa">Welcome {user}!</h2>

        <div className="col-lg-2 col-sm-12 score-board">
          <h3>
            Timer : {String(min).padStart(2, "0")}:
            {String(sec).padStart(2, "0")}
          </h3>
          <h2> Score : {score.current}</h2>{" "}
          <button
            onClick={() =>
              navigate("/leaderboard", {
                state: {
                  id: location.state.id,
                },
              })
            }
            className="up m-2"
          >
            High Score
          </button>
          <div>
            <button className="reloadbtn" onClick={() => resetGame()}>
              Restart
            </button>

            <button className="reloadbtn" onClick={() => navigate(-1)}>
              Back to Home
            </button>
          </div>
        </div>
        <div className="col-lg-9 col-sm-12 game">
          {currentColorArrangement.map((candyColor, index) => (
            <img
              key={index}
              src={candyColor}
              alt={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Game Over!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Game Over! Time’s up! Great effort—try again and aim for a new high
            score!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <NamePopUp show={modalShow} onHide={() => setModalShow()} />

        {gameOver ?? <h2>Game Over</h2>}

      </div>
    </Layout>
  );
}
export default CandyCrush;
