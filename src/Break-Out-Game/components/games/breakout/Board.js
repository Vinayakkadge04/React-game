import React, { useEffect, useRef } from "react";
import { BallMovement } from "./BallMovement";
import data from "../../data";
import WallCollision from "./util/WallCollision";
import Paddle from "./Paddle";
import Brick from "./Brick";
import BrickCollision from "./util/BrickCollision";
import PaddleHit from "./util/PaddleHit";
import PlayerStats from "./PlayerStats";
import AllBroken from "./util/AllBroke";
import ResetBall from "./util/ResetBall";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NamePopUp from "../../../../name_pop";

let bricks = [];
let { ballObj, paddleProps, brickObj, player } = data;

export default function Board() {
  const canvasRef = useRef(null);
  const location = useLocation();
  const [modalShow, setModalShow] = React.useState(true);
  const { user, nameEntered, id } = useSelector((state) => state.user);
  let navigate = useNavigate();

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      paddleProps.y = canvas.height - paddleProps.height;

      // Assign Bricks
      let newBrickSet = Brick(player.level, bricks, canvas, brickObj);

      if (newBrickSet && newBrickSet.length > 0) {
        bricks = newBrickSet;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      PlayerStats(ctx, player, canvas);

      // Display Bricks
      bricks.map((brick) => {
        return brick.draw(ctx);
      });

      // Handle Ball Movement
      BallMovement(ctx, ballObj);

      // Check all broken
      AllBroken(bricks, player, canvas, ballObj);

      if (player.lives === 0) {
        alert("Game Over! Press ok to restart");

        player.lives = 5;
        player.level = 1;
        player.score = 0;
        ResetBall(ballObj, canvas, paddleProps);
        bricks.length = 0;
      }

      WallCollision(ballObj, canvas, player, paddleProps);

      let brickCollision;

      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BrickCollision(ballObj, bricks[i]);

        if (brickCollision.hit && !bricks[i].broke) {
          // console.log(brickCollision);
          if (brickCollision.axis === "X") {
            ballObj.dx *= -1;
            bricks[i].broke = true;
          } else if (brickCollision.axis === "Y") {
            ballObj.dy *= -1;
            bricks[i].broke = true;
          }
          player.score += 10;
        }
      }
      Paddle(ctx, canvas, paddleProps);

      // Paddle + Ball Collision
      PaddleHit(ballObj, paddleProps);

      requestAnimationFrame(render);
    };
    render();
  }, []);

  const restartGame = (canvas) => {
    player.lives = 5;
    player.level = 1;
    player.score = 0;
    ResetBall(ballObj, canvas, paddleProps);
    bricks.length = 0;
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
          score: player.score,
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
    <div style={{ textAlign: "center" }}>
      <h3>Welcome {user}!</h3>
      <canvas
        style={{ border: "5px solid #666", background: "#000" }}
        id="canvas"
        ref={canvasRef}
        onMouseMove={(event) =>
          (paddleProps.x =
            event.clientX -
            (window.innerWidth < 900 ? 10 : (window.innerWidth * 20) / 200) -
            paddleProps.width / 2 -
            10)
        }
        height="500px"
        width={
          window.innerWidth < 900
            ? window.innerWidth - 20
            : window.innerWidth - (window.innerWidth * 20) / 100
        }
      />

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

        <button
          onClick={() => {
            restartGame();
          }}
        >Reload</button>
      </div>
      <NamePopUp show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
