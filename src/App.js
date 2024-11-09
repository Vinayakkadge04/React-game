import React from "react";
import { BrowserRouter , Route , Routes } from "react-router-dom";

import TicTacToe from "./TicTacToe/TicTacToe";
import HangMan from "./component/HangMan";
export default function App() {
  
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<TicTacToe/>}/>
            <Route path="/hangman" element={<HangMan/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}
