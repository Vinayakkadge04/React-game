import React from "react";
import { BrowserRouter , Route , Routes } from "react-router-dom";

import TicTacToe from "./TicTacToe/TicTacToe";
import HangMan from "./Hangman/HangMan";
import FlapyBird from "./FlapyBird/FlapyBird";
import CandyCrush from "./CandyCrush/candyCrush";
import HomePage from "./HomePage/HomePage";
import MemoryGame from "./MemoryGame/MemoryGame";
import RockPaperScissor from "./RockPaperScissor/RockPaperScissor";
export default function App() {
  
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="tictactoe" element={<TicTacToe/>}/>
            <Route path="/hangman" element={<HangMan/>}/>
            <Route path='/flapybird' element={<FlapyBird/>}/>
            <Route path='/candycrush' element={<CandyCrush/>}/>
            <Route path="/memory" element={<MemoryGame/>}/>
            <Route path ="/rps" element={<RockPaperScissor/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}
