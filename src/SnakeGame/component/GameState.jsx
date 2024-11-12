 import React,{useEffect, useState} from 'react'
import GamePieces from './GamePieces';
import './style.css'
 
 function GameState() {
    const [score , setScore] = useState(0);
    const [highScore , setHighScore] = useState(parseInt(localStorage.getItem('highscore'))|| 0)
    const [GameOver , setgameOver] = useState(false)
    const [collision , setCollisionType] = useState("")

    const handleGameOver = (type) =>{
        setgameOver(true);
        if(score > highScore){
            setHighScore(score)
            localStorage.setItem('highscore', score.toString())
        }
        setCollisionType(type)
        }

        const handleResetGame = () =>{
             setScore(0)
             setgameOver(false);
        }
    

    useEffect(()=>{
        const handleKeyPress = (e) =>{
            if(GameOver && e.key === "Enter"){
                handleResetGame()
            }
        }
        window.addEventListener("keydown" , handleKeyPress)
    },[GameOver])

   return (
   <div className='snakegame'>
    <p>Score : {score}</p>
    <p>HighScore : {highScore}</p>
    <div>
        {
            GameOver && 
            ( <div>
                <p>Game Over ! { collision === "wall" ? "You Hit the Wal" : "You Ate Yourself"}!</p>
                <p>Plese press Enter for reload</p>
            </div>)
        }
        {
            !GameOver && 
           ( <div> 
                <GamePieces 
                score = {score}
                setScore ={setScore}
                onGameOver = {(type) => handleGameOver(type)}
                />
            </div>)
        }
    </div>
   </div>

   )
}
 export default GameState