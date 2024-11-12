import React, { useEffect, useRef , useState} from "react";
import "./style.css";

function GamePieces({score , setScore, onGameOver}) {
  const canvasRef = useRef();
  const snake_speed = 10;

  const [apple, setApple] = useState({ x: 180, y: 100 });
  const [snake, setSnake] = useState([{ x: 100, y: 50 }, { x: 95, y: 50 }]);
  const [direction , setDirection] = useState(null)

  useEffect(()=>{
    const canvas = canvasRef.current;
    console.log(canvasRef.current)
    const ctx = canvas.getContext("2d")

    const drawSnake = () =>{
        snake.forEach((snakePark) => {
            ctx.beginPath();
            ctx.rect(snakePark.x, snakePark.y , 14 , 14)
            ctx.fillStyle = "#90EE90"
            ctx.fill()
            ctx.closePath()
        })
    }

    const drawApple = () =>{
            ctx.beginPath();
            ctx.rect(apple.x, apple.y , 14 , 14)
            ctx.fillStyle = "#FF0000"
            ctx.fill()
            ctx.closePath()
    }

    const moveSnake = () =>{
        if(direction){
            setSnake((prevSnake)=>{
                const newSnake = [...prevSnake];
                const snakeHead = {x : newSnake[0].x , y : newSnake[0].y}

                for(let i = newSnake.length -1 ; i > 0 ; i -- ){
                    newSnake[i].x = newSnake[i-1].x
                    newSnake[i].y = newSnake[i-1].y
                }


                switch(direction){
                    case "right":
                        snakeHead.x += snake_speed
                        break;
                    case "left":
                        snakeHead.x -=snake_speed
                        break;
                    case "up" : 
                        snakeHead.y -= snake_speed
                        break;
                    case "down" :
                        snakeHead.y += snake_speed
                    default  : 
                        break
                }

                newSnake[0] = snakeHead;
                handleAppleCollision(newSnake);
                handleWallCollision(snakeHead);
                return newSnake
            });
        }
    }

    const handleWallCollision = (snakeHead) => {
        if(snakeHead.x + snake_speed > canvas.width ||snakeHead.x + snake_speed < 0){
            onGameOver("wall");
        }
        if(snakeHead.y + snake_speed > canvas.height || snakeHead.y + snake_speed <0){
            onGameOver("wall")
        }
    }


    const handleAppleCollision = (newSnake) =>{
        const snakeHead = newSnake[0];
        if(snakeHead.x === apple.x && snakeHead.y === apple.y){
            setScore(score++)
            setApple({
                x: Math.floor((Math.random() * canvas.width) / snake_speed * snake_speed),
                y: Math.floor((Math.random() * canvas.height) / snake_speed * snake_speed)
            })

            newSnake.push({
                x: newSnake[newSnake.length - 1 ].x,
                y: newSnake[newSnake.length - 1 ].y
            })
        }
    }



    const handleKeyPress = (e) =>{
        switch(e.key){
            case "ArrowRight":
                setDirection("right")
                break;
            case "ArrowLeft" :
                setDirection("left")
                break;
            case "ArrowUp" :
                setDirection("up")
                break;
            case "ArrowDown":
                setDirection("down")
                break;
            default:
                break;
        }
    }

    window.addEventListener("keydown",handleKeyPress)
 
    const interval = setInterval(()=>{
        ctx.clearRect(0,0,canvas.width , canvas.height);
        drawSnake()
        drawApple()
        moveSnake()
    },100)

    return () =>{
         clearInterval(interval);
    }

  },[snake , direction])

  return (
    <div>
      <canvas className="gameCanvas" ref={canvasRef} width={750} height={420} />
    </div>
  );
}

export default GamePieces;
