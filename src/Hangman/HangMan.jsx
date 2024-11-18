import React, { useEffect, useState } from "react";
import { HangManData } from "../data";
import { keyboardData } from "../Data/keyboardBtn";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./hangman.css";

function HangMan() {
  let navigate = useNavigate();
  const [wordArray, setWordArray] = useState([]);
  const [duplicateArray, setduplicateArray] = useState([]);
  const [error, seterror] = useState([]);
  const [lock, setlock] = useState(false);
  const [img, setimg] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow();
  const handleShow = () => setShow(true);
  const [start , setStart] = useState(false)
  const [gameOver , setgameOver] = useState(false);

  const [image, setimage] = useState([
    "https://i.imgur.com/kReMv94.png",
    "https://i.imgur.com/UFP8RM4.png",
    "https://i.imgur.com/9McnEXg.png",
    // "https://i.imgur.com/vNAW0pa.png",
    "https://i.imgur.com/8UFWc9q.png",
    "https://i.imgur.com/rHCgIvU.png",
    "https://i.imgur.com/CtvIEMS.png",
    "https://i.imgur.com/Z2mPdX0.png",
  ]);

  useEffect(() => {
    const random = Math.floor(Math.random() * HangManData.length);
    const myArray = (random, HangManData[random].word).toUpperCase().split("");
    setWordArray(myArray);
   
  }, []);

  useEffect(() => {
    setduplicateArray(Array(wordArray.length).fill(""));
  }, [wordArray]);

  useEffect(() => {
    duplicateArray.forEach((item , index) =>{
      console.log(JSON.stringify(wordArray),"WordArray");
      console.log(JSON.stringify(duplicateArray),"Duplicate")
      if(!gameOver && start && JSON.stringify(wordArray) === JSON.stringify(duplicateArray) ){
        console.log("Congratulations, You Win!");
        handleShow()
      }
      })
  }, [duplicateArray]);

  useEffect(() => {
    setimg(image[error.length]);
  }, [error]);

  const checkSimilarity = (value, e) => {
    if (lock) {
      return null;
    }

    if (wordArray.includes(value, e)) {
      setStart(true)
      e.target.innerHTML = "✔️";
      e.target.style.backgroundColor = "#39e75f";
      var testArray = [...duplicateArray];
      wordArray.forEach((item, index) => {
        if (item === value) {
          testArray[index] = value;
          setduplicateArray(testArray);
        }
      });
    } else {
      e.target.innerHTML = "✖️";
      e.target.style.backgroundColor = "#ff474c";
      if (error.length === 5) {
        seterror([...error, ""]);
        setlock(true);
        console.log("You Lost!!!");
        setgameOver(true)
        setduplicateArray(wordArray);
      } else if (error.length < 6) {
        seterror([...error, ""]);
      }
    }
  };

  return (
    <>
      <div className="cont row">
        <h1 id="title">Hangman</h1>
        <div className="col-md-3 col-sm-12 d-flex flex-column align-items-center justify-content-center">
          <h5>Lets guess the word🤔</h5>
          <img className="img" src={img} alt="" />
        </div>


        <div className="col-md-9 col-sm-12">
          <div className="content">
            <div className="word">
              {duplicateArray.map((e) => {
                return <div className="sbox">{e}</div>;
              })}
            </div>

            <div className="keyboard">
              {keyboardData.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                  {row.map((button, index) => (
                    <button
                      onClick={(e) => {
                        checkSimilarity(button.key, e);
                      }}
                      key={button.id}
                      className="key-button"
                    >
                      {button.key}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="classbtn">
      <button className="reloadbtn" onClick={() => window.location.reload()}>
        Restart
      </button>

      <button className="reloadbtn" onClick={() => navigate(-1)}>
        Back to Home
      </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, You won the match!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
          
        </Modal.Footer>
      </Modal>


    </>
  );
}

export default HangMan;
