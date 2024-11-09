import React, { useEffect, useState } from "react";
import { HangManData } from "../data";
import { keyboardData } from "../Data/keyboardBtn";
import "./hangman.css";

function HangMan() {
  const [wordArray, setWordArray] = useState([]);
  

  useEffect(() => {
    const random = Math.floor(Math.random() * HangManData.length);
    const myArray = (random, HangManData[random].word).toUpperCase().split("");
    console.log(myArray)
    setWordArray(myArray);

    
  }, []);

  const checkSimilarity = (value) =>{
    console.log(wordArray)
      if(wordArray.includes(value))
      {
        console.log("Correct");
        console.log(wordArray.indexOf(value));
      }
      else{
        console.log("False")
      }
  }


  return (
    <>
      <div className="container">
        <div className="word">
          {wordArray.map((e) => {
            return <div className="sbox"> </div>;
          })}
        </div>
    
          <div className="keyboard">
            {keyboardData.map((row, rowIndex) => (
              <div key={rowIndex} className="keyboard-row">
                {row.map((button , index) => (
                  <button onClick={()=>{checkSimilarity(button.key)}} key={button.id} className="key-button">
                    {button.key}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
    
    </>
  );
}

export default HangMan;
