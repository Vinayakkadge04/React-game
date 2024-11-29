import React, { useState, useEffect } from "react";
import "./snakegame.css";
import NamePopUp from "../name_pop";
import { useSelector } from "react-redux";
import { URL } from "../utils/constants";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout";
const ROWS = 25;
const COLS = 25;
const INITIAL_SNAKE = [{ row: 12, col: 12 }];
const INITIAL_DIRECTION = "RIGHT";

const generateFood = () => {
  return {
    row: Math.floor(Math.random() * ROWS),
    col: Math.floor(Math.random() * COLS),
  };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(generateFood());
  const [gameOver, setGameOver] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [score, setScore] = useState(0);
  const [gameId, setgameId] = useState(null);
  const location = useLocation();
  const [modalShow, setModalShow] = useState(true);
  const navigate = useNavigate();

  const { user, nameEntered, id } = useSelector((state) => state.user);
  const checkCollision = (snake) => {
    const head = snake[0];
    return (
      snake
        .slice(1)
        .some(
          (segment) => segment.row === head.row && segment.col === head.col
        ) ||
      head.row < 0 ||
      head.row >= ROWS ||
      head.col < 0 ||
      head.col >= COLS
    );
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    if (!gameOver && !isPause) {
      const moveSnake = () => {
        const newSnake = snake.map((segment) => ({ ...segment }));
        const head = { ...newSnake[0] };
        switch (direction) {
          case "UP":
            head.row = (head.row - 1 + ROWS) % ROWS;
            break;
          case "DOWN":
            head.row = (head.row + 1) % ROWS;
            break;
          case "LEFT":
            head.col = (head.col - 1 + COLS) % COLS;
            break;
          case "RIGHT":
            head.col = (head.col + 1) % COLS;
            break;
          default:
            break;
        }

        newSnake.unshift(head);
        if (head.row === food.row && head.col === food.col) {
          setFood(generateFood());
          setScore(score + 10);
        } else {
          newSnake.pop();
        }

        if (checkCollision(newSnake)) {
          InsertScore();
          setGameOver(true);
        } else {
          setSnake(newSnake);
        }
      };
      const gameInterval = setInterval(moveSnake, 100);
      return () => {
        clearInterval(gameInterval);
      };
    }
  }, [snake, direction, food, gameOver, isPause, score]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection("UP");
          break;
        case "ArrowDown":
          setDirection("DOWN");
          break;
        case "ArrowLeft":
          setDirection("LEFT");
          break;
        case "ArrowRight":
          setDirection("RIGHT");
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyPress);

  }, []);

  useEffect(() => {
    if(nameEntered){
    setModalShow(!nameEntered);
    console.log(nameEntered,"Name Enetered!!!")
    }
  }, []);

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
        navigate("/leaderboard", {
          state: {
            id: location.state.id,
          },
        })
      }
    } catch (error) {
      console.log(error, "Error");
    }
  };



  return (
   <Layout>
     <>
      <div className="snake_App">
      <h5>Welcome {user}!</h5>
        <h1>Hungry Snake</h1>
        <p> Score : 🚀 {score}</p>
        <div className="game-board">
          {Array.from({ length: ROWS }).map((_, rowIndex) => (
            <div key={rowIndex} className="snakerow">
              {Array.from({ length: COLS }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`cell ${
                    snake.some(
                      (segment) =>
                        segment.row === rowIndex && segment.col === colIndex)
                      ? "snake"
                      : ""
                  } ${
                    food.row === rowIndex && food.col === colIndex ? "food" : ""
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </div>
        {gameOver && (
          <div className="dialog">
            <div className="reset">
              <p>
                Game Over! <b>Your Score 🐍 {score}</b>
              </p>
              <button onClick={resetGame}>Restart</button>
            </div>
          </div>
        )}
        <div className="control">
          <div className="button">
            <button className="up" onClick={() => setDirection("UP")}>
              ↑
            </button>
            <br />
            <button className="left" onClick={() => setDirection("LEFT")}>
              ←
            </button>
            <button className="right" onClick={() => setDirection("RIGHT")}>
              →
            </button>
            <br />
            <button className="down" onClick={() => setDirection("DOWN")}>
              ↓
            </button>
          </div>
        </div>

        <div className="navigation">
          <div className="button">
            <button
              onClick={() =>
                navigate("/leaderboard", {
                  state: {
                    id: location.state.id,
                  },
                })
              }
              className="up"
            >
              View Score
            </button>
            <br />

            <button
              className="left"
              onClick={() => {
                resetGame();
              }}
            >
              Reload Game
            </button>
            <a href={"/"}>
              <button className="right">Back to Home</button>
              <br />
            </a>
          </div>
        </div>
        <NamePopUp show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
   </Layout>
  );
};

export default SnakeGame;
