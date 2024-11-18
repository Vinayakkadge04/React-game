import React from "react";
import { BrowserRouter , Route , Routes } from "react-router-dom";
import TicTacToe from "./TicTacToe/TicTacToe";
import HangMan from "./Hangman/HangMan";
import FlapyBird from "./FlapyBird/FlapyBird";
import CandyCrush from "./CandyCrush/candyCrush";
import HomePage from "./HomePage/HomePage";
import MemoryGame from "./MemoryGame/MemoryGame";
import RockPaperScissor from "./RockPaperScissor/RockPaperScissor";
import SnakeGame from "./SnakeGame/SnakeGame";
import { FindWord } from "./WordSearch/pages/Home/Home";
import BreakOutGame from "./Break-Out-Game/BreakOutGame";
import Layout from "./Layout";
import Login from "./login/login";
import Register from "./Register";
import LeaderBoard from "./LeaderBoard";

export default function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}/>
            <Route index  element={<Login/>} />
            <Route path='/register' element={<Register/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="tictactoe" element={<TicTacToe/>}/>
            <Route path="/hangman" element={<HangMan/>}/>
            <Route path='/flapybird' element={<FlapyBird/>}/>
            <Route path='/candycrush' element={<CandyCrush/>}/>
            <Route path="/memory" element={<MemoryGame/>}/>
            <Route path ="/rps" element={<RockPaperScissor/>}/>
            <Route path ='/snake' element={<SnakeGame/>}/>
            <Route path="/findword" element={<FindWord/>}/>
            <Route path="/breakout" element={<BreakOutGame/>}/>
            <Route path="/leaderBoard" element={<LeaderBoard/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}
