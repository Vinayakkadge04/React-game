import styled from "styled-components";
import './flapybird.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const BIRD_HEIGHT = 28;
const BIRD_WIDTH = 33;
const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;
const GRAVITY = 8;
const OBJ_WIDTH = 52;
const OBJ_SPEED = 6;
const OBJ_GAP = 200;
function FlapyBird() {
  let navigate = useNavigate();
  const [isStart, setIsStart] = useState(false);
  const [birdpos, setBirspos] = useState(300);
  const [objHeight, setObjHeight] = useState(0);
  const [objPos, setObjPos] = useState(WALL_WIDTH);
  const [score, setScore] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const [resmin, setresMin] = useState(0);
  const [ressec, setresSec] = useState(0);

  const [res , setres] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  useEffect(() => {
    let intVal;
    if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {
      intVal = setInterval(() => {
        setBirspos((birdpos) => birdpos + GRAVITY);
      }, 24);
    }
    return () => clearInterval(intVal);
  });

useEffect(()=>{
  if(isStart){
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setSec((prevSec) => {
          if (prevSec === 59) {
            setMin((prevMin) => prevMin + 1);
            return 0;
          }
          return prevSec + 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }
},[isStart])

  useEffect(() => {
    let objval;
    if (isStart && objPos >= -OBJ_WIDTH) {
      objval = setInterval(() => {
        setObjPos((objPos) => objPos - OBJ_SPEED);
      }, 24);

      return () => {
        clearInterval(objval);
      };
    } else {
      setObjPos(WALL_WIDTH);
      setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)));
      if (isStart) setScore((score) => score + 1);
    }
  }, [isStart, objPos]);

  useEffect(() => {
    let topObj = birdpos >= 0 && birdpos < objHeight;
    let bottomObj =
      birdpos <= WALL_HEIGHT &&
      birdpos >=
        WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT;

    if (
      objPos >= OBJ_WIDTH &&
      objPos <= OBJ_WIDTH + 80 &&
      (topObj || bottomObj)
    ) {
      setIsStart(false);
     
      setBirspos(300);
      setScore(0);
    }
  }, [isStart, birdpos, objHeight, objPos]);
  const handler = () => {
    if (!isStart){ setIsStart(true);
      setMin(0);
      setSec(0);
    }
   
    else if (birdpos < BIRD_HEIGHT) setBirspos(0);
    else setBirspos((birdpos) => birdpos - 50);
  };
  return (
    <Home onClick={handler}>
      {/* <span className="scoring">Score : {score}</span> */}
      <h3>Time :  {String(min).padStart(2, "0")}:{String(sec).padStart(2, "0")}</h3>
      <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
        {!isStart ? <Startboard>Click To Start</Startboard> : null}
        <Obj
          height={objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={0}
          deg={180}
        />
        <Bird
          height={BIRD_HEIGHT}
          width={BIRD_WIDTH}
          top={birdpos}
          left={100}
        />
        <Obj
          height={WALL_HEIGHT - OBJ_GAP - objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))}
          deg={0}
        />
      </Background>

      <div>
      <button className="reladbtn" onClick={()=>window.location.reload()}>
          Restart
        </button>

        <button className="reladbtn" onClick={()=>navigate(-1)}>
          Back to Home
        </button>
      </div>
    </Home>
  );
}

export default FlapyBird;

const Home = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #6a11cb, #2575fc); /* Gradient background */
  overflow: hidden;
  flex-direction:column;
`;
const Background = styled.div`
  background-image: url("../images/background-day.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow:hidden;
   border: 5px solid #ffffff; 
  border-radius: 20px; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  @media screen and (max-width:440px){
    width:340px
  }
`;

const Bird = styled.div`
  position: absolute;
  background-image: url("../images/yellowbird-upflap.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Obj = styled.div`
  position: relative;
  background-image: url("../images/pipe-green.png");
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

const Startboard = styled.div`
   position: relative;
  top: 49%;
  background-color: #1e1e1e;
  padding: 15px 20px;
  width: 120px;
  left: 50%;
  margin-left: -60px;
  text-align: center;
  font-size: 24px;
  border-radius: 10px;
  color: #ffcc00; 
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4); /* Strong shadow for emphasis */
  text-transform: uppercase;
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ScoreShow = styled.div`
  text-align: center;
  background: transparent;
`;

